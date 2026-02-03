export const listHash = () => '#/';

export const issueDetailHash = (issueId: string) => `#/issues/${encodeURIComponent(issueId)}`;

export const newIssueHash = () => '#/issues/new';

const decodePathPart = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const isNewIssueRoute = (hash: string): boolean => {
  const normalized = (hash ?? '').replace(/^#/, '');
  if (!normalized) return false;
  const path = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  const parts = path.split('/').filter(Boolean);
  return parts[0] === 'issues' && parts[1] === 'new';
};

export const getIssueIdFromRoute = (hash: string): string | null => {
  const normalized = (hash ?? '').replace(/^#/, '');
  if (!normalized || normalized === '/') return null;

  if (normalized.startsWith('issue=')) {
    const id = normalized.slice('issue='.length).trim();
    return id ? decodePathPart(id) : null;
  }

  const path = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'issues' && parts[1] && parts[1] !== 'new') return decodePathPart(parts[1]);

  return null;
};
