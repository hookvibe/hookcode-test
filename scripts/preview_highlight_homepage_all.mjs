// Sweep homepage selectors and send highlight requests sequentially. docs/en/developer/plans/preview-highlight-homepage-20260203/task_plan.md preview-highlight-homepage-20260203
import fs from 'fs/promises';
import path from 'path';

const HELP_TEXT = `Preview Highlight Homepage Sweep

Usage:
  node scripts/preview_highlight_homepage_all.mjs

Environment:
  HOOKCODE_API_BASE_URL   Base URL of HookCode backend (e.g. http://127.0.0.1:4000)
  HOOKCODE_PAT            PAT token for Authorization: Bearer <PAT>
  HOOKCODE_TASK_GROUP_ID  Task group id
  HOOKCODE_PREVIEW_INSTANCE (optional, default: app)

Options:
  --task-group <id>   Override task group id
  --instance <name>   Override preview instance name (default: app)
  --delay <ms>        Delay between highlights (default: 250)
  --limit <n>         Only send the first N selectors
  --padding <px>      Highlight padding (default: 6)
  --mode <mode>       outline|mask (default: outline)
  --scroll <bool>     true|false (default: true)
  --help              Show help

Notes:
  - This script approximates "highlight all homepage elements" by sweeping class selectors
    extracted from homepage-related React components, because the bridge highlights only the
    first match of a CSS selector via document.querySelector().
`;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      args[key] = true;
      continue;
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function requireEnv(key) {
  const raw = process.env[key];
  const value = raw ? String(raw).trim() : '';
  if (!value) {
    throw new Error(`${key} is required (set it in the environment).`);
  }
  return value;
}

function parseBoolean(raw, fallback) {
  if (raw === undefined) return fallback;
  const normalized = String(raw).trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false;
  throw new Error(`Invalid boolean value: ${raw}`);
}

function parseInteger(raw, fallback) {
  if (raw === undefined) return fallback;
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid integer value: ${raw}`);
  }
  return parsed;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidClassToken(token) {
  if (!token) return false;
  if (token.includes('${')) return false;
  // Keep the selector generation predictable by allowing only common class-name characters.
  return /^[a-zA-Z0-9_-]+$/.test(token);
}

function extractClassTokens(source) {
  const tokens = new Set();

  // Capture className="a b" and className='a b'
  const directRegex = /className\s*=\s*(?:"([^"]+)"|'([^']+)')/g;
  for (const match of source.matchAll(directRegex)) {
    const raw = (match[1] ?? match[2] ?? '').trim();
    raw
      .split(/\s+/g)
      .map((value) => value.trim())
      .filter(isValidClassToken)
      .forEach((value) => tokens.add(value));
  }

  // Capture className={`layout ${cond ? 'a' : 'b'}`}
  const templateRegex = /className\s*=\s*{\s*`([\s\S]*?)`\s*}/g;
  for (const match of source.matchAll(templateRegex)) {
    const template = match[1] ?? '';

    // Static parts of the template literal.
    const withoutExpressions = template.replace(/\$\{[\s\S]*?\}/g, ' ');
    withoutExpressions
      .split(/\s+/g)
      .map((value) => value.trim())
      .filter(isValidClassToken)
      .forEach((value) => tokens.add(value));

    // Also pick up any string literals inside ${ ... } blocks.
    const embeddedStringRegex = /'([^']+)'|"([^"]+)"/g;
    for (const embeddedMatch of template.matchAll(embeddedStringRegex)) {
      const raw = (embeddedMatch[1] ?? embeddedMatch[2] ?? '').trim();
      raw
        .split(/\s+/g)
        .map((value) => value.trim())
        .filter(isValidClassToken)
        .forEach((value) => tokens.add(value));
    }
  }

  return [...tokens];
}

async function readText(filePath) {
  return fs.readFile(filePath, 'utf8');
}

async function postJson(url, headers, body) {
  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  const text = await response.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : undefined;
  } catch {
    parsed = { raw: text };
  }
  return { status: response.status, statusText: response.statusText, body: parsed };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(HELP_TEXT);
    return;
  }

  const baseUrl = requireEnv('HOOKCODE_API_BASE_URL');
  const pat = requireEnv('HOOKCODE_PAT');
  const taskGroupId = (args['task-group'] ?? process.env.HOOKCODE_TASK_GROUP_ID ?? '').trim();
  if (!taskGroupId) {
    throw new Error('Task group id is required (use --task-group or HOOKCODE_TASK_GROUP_ID).');
  }
  const instanceName = String(args.instance ?? process.env.HOOKCODE_PREVIEW_INSTANCE ?? 'app').trim() || 'app';

  const delayMs = parseInteger(args.delay, 250);
  const limit = args.limit !== undefined ? parseInteger(args.limit, 0) : undefined;
  const padding = parseInteger(args.padding, 6);
  const mode = String(args.mode ?? 'outline').trim();
  if (!['outline', 'mask'].includes(mode)) {
    throw new Error('mode must be "outline" or "mask".');
  }
  const scrollIntoView = parseBoolean(args.scroll, true);

  const projectRoot = process.cwd();
  const homepageFiles = [
    'src/App.tsx',
    'src/components/Header.tsx',
    'src/components/Sidebar.tsx',
    'src/components/FilterBar.tsx',
    'src/components/StatsBar.tsx',
    'src/components/IssueList.tsx',
    'src/components/IssueRow.tsx'
  ].map((file) => path.join(projectRoot, file));

  const classTokens = new Set();
  for (const filePath of homepageFiles) {
    const source = await readText(filePath);
    extractClassTokens(source).forEach((token) => classTokens.add(token));
  }

  const selectors = [
    'html',
    'body',
    '#root',
    ...[...classTokens].sort().map((token) => `.${token}`)
  ];

  const slicedSelectors = limit && limit > 0 ? selectors.slice(0, limit) : selectors;
  console.log(`Collected selectors: ${slicedSelectors.length}`);
  console.log(`Target: taskGroup=${taskGroupId} instance=${instanceName}`);

  const url = new URL(`/api/task-groups/${taskGroupId}/preview/${instanceName}/highlight`, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
  const headers = new Headers({
    Accept: 'application/json',
    Authorization: `Bearer ${pat}`,
    'Content-Type': 'application/json'
  });

  const colors = ['#2563EB', '#22C55E', '#F97316', '#A855F7', '#EF4444'];

  for (let i = 0; i < slicedSelectors.length; i += 1) {
    const selector = slicedSelectors[i];
    const bubbleText = `${i + 1}/${slicedSelectors.length}: ${selector}`.slice(0, 280);
    const payload = {
      selector,
      mode,
      padding,
      scrollIntoView,
      color: colors[i % colors.length],
      bubble: {
        text: bubbleText,
        placement: 'auto',
        theme: 'dark'
      },
      requestId: `homepage-sweep-${Date.now()}-${i}`
    };

    const { status, statusText, body } = await postJson(url.toString(), headers, payload);
    const subscribers = body && typeof body === 'object' ? body.subscribers : undefined;
    console.log(`[${i + 1}/${slicedSelectors.length}] ${selector} -> ${status} ${statusText} (subscribers=${subscribers ?? 'n/a'})`);

    await sleep(delayMs);
  }

  console.log('Done. If subscribers stayed at 0, open HookCode preview UI to connect the bridge and retry.');
}

main().catch((error) => {
  console.error(error?.message || error);
  process.exit(1);
});

