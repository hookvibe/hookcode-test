import type { Issue, Label, User } from '../types';

const labels: Label[] = [
  { id: 'label-bug', name: 'bug', color: '#ef4444', description: '功能缺陷' },
  { id: 'label-ui', name: 'ui', color: '#3b82f6', description: '界面与交互' },
  { id: 'label-perf', name: 'performance', color: '#f97316', description: '性能优化' },
  { id: 'label-security', name: 'security', color: '#7c3aed', description: '安全' },
  { id: 'label-docs', name: 'docs', color: '#0ea5e9', description: '文档' },
  { id: 'label-feature', name: 'feature', color: '#10b981', description: '新功能' },
  { id: 'label-design', name: 'design', color: '#ec4899', description: '设计规范' }
];

const users: User[] = [
  { id: 'user-01', name: 'Lin Chen', handle: 'linchen', role: 'Maintainer' },
  { id: 'user-02', name: 'Qian Wu', handle: 'qianwu', role: 'Design' },
  { id: 'user-03', name: 'Mira Zhao', handle: 'mirazhao', role: 'Frontend' },
  { id: 'user-04', name: 'Zhou Yang', handle: 'zhouyang', role: 'QA' },
  { id: 'user-05', name: 'Rui Li', handle: 'ruili', role: 'Security' }
];

const [bug, ui, perf, security, docs, feature, design] = labels;
const [lin, qian, mira, zhou, rui] = users;

export const issueData: Issue[] = [
  {
    id: 'ISSUE-1024',
    number: 1024,
    title: {
      zh: '登录后重定向路径在多标签页下丢失',
      en: 'Post-login redirect path lost across multiple tabs'
    },
    status: 'open',
    labels: [bug, ui],
    author: lin,
    assignees: [mira],
    comments: 12,
    updatedAt: '2026-01-14T09:30:00+08:00',
    createdAt: '2026-01-10T09:30:00+08:00',
    priority: 'p1',
    project: 'HookCode',
    summary: {
      zh: '多标签页同时操作时，回跳逻辑未能读取正确的缓存 key，导致跳回默认首页。',
      en: 'When working in multiple tabs, the redirect flow reads the wrong cache key and sends users back to the default home page.'
    }
  },
  {
    id: 'ISSUE-1021',
    number: 1021,
    title: {
      zh: 'Issue 列表滚动到 100 条后明显卡顿',
      en: 'Issue list stutters after 100 items'
    },
    status: 'open',
    labels: [perf],
    author: zhou,
    assignees: [mira, lin],
    comments: 5,
    updatedAt: '2026-01-13T16:12:00+08:00',
    createdAt: '2026-01-08T11:05:00+08:00',
    priority: 'p2',
    project: 'HookCode',
    summary: {
      zh: '列表渲染缺少虚拟化，频繁计算 layout 与阴影导致 GPU 负载过高。',
      en: 'Missing virtualization and heavy layout/shadow calculations push GPU load too high.'
    }
  },
  {
    id: 'ISSUE-1018',
    number: 1018,
    title: {
      zh: '新增「批量关闭」操作与确认弹层',
      en: 'Add bulk close action with confirmation modal'
    },
    status: 'open',
    labels: [feature],
    author: qian,
    assignees: [lin],
    comments: 8,
    updatedAt: '2026-01-12T14:40:00+08:00',
    createdAt: '2026-01-07T10:10:00+08:00',
    priority: 'p3',
    project: 'HookCode',
    summary: {
      zh: '为团队维护流程增加批量处理能力，需要明确风险提示与可撤销设计。',
      en: 'Introduce batch handling to the maintenance workflow with clear risk prompts and undo options.'
    }
  },
  {
    id: 'ISSUE-1016',
    number: 1016,
    title: {
      zh: '安全审计：token 刷新策略需支持过期前 2 分钟续签',
      en: 'Security audit: refresh token 2 minutes before expiry'
    },
    status: 'open',
    labels: [security],
    author: rui,
    assignees: [lin, mira],
    comments: 3,
    updatedAt: '2026-01-11T09:20:00+08:00',
    createdAt: '2026-01-05T18:30:00+08:00',
    priority: 'p0',
    project: 'HookCode',
    summary: {
      zh: '当前刷新策略过于激进，容易导致大量 401 重试，需调整并增加可观测性。',
      en: 'Current refresh strategy is too aggressive and triggers many 401 retries; adjust and add observability.'
    }
  },
  {
    id: 'ISSUE-1012',
    number: 1012,
    title: {
      zh: '文档：Issue 标签使用规范与颜色说明',
      en: 'Docs: Issue label usage and color guidelines'
    },
    status: 'closed',
    labels: [docs, design],
    author: qian,
    assignees: [qian],
    comments: 2,
    updatedAt: '2026-01-09T12:15:00+08:00',
    createdAt: '2025-12-29T09:00:00+08:00',
    priority: 'p3',
    project: 'HookCode',
    summary: {
      zh: '补充标签色板与语义说明，减少团队命名混乱。',
      en: 'Document label palette and semantics to reduce naming confusion.'
    }
  },
  {
    id: 'ISSUE-1009',
    number: 1009,
    title: {
      zh: 'Issue 详情页缺少键盘导航与 focus ring',
      en: 'Issue detail lacks keyboard navigation and focus ring'
    },
    status: 'closed',
    labels: [ui, design],
    author: zhou,
    assignees: [mira],
    comments: 4,
    updatedAt: '2026-01-08T15:30:00+08:00',
    createdAt: '2025-12-28T15:25:00+08:00',
    priority: 'p2',
    project: 'HookCode',
    summary: {
      zh: '需要对可交互控件补齐可见焦点与键盘访问顺序。',
      en: 'Add visible focus styles and keyboard order for interactive controls.'
    }
  },
  {
    id: 'ISSUE-1002',
    number: 1002,
    title: {
      zh: '统一 Issue 列表空状态与引导文案',
      en: 'Unify empty state and guidance copy for issue list'
    },
    status: 'closed',
    labels: [ui, docs],
    author: lin,
    assignees: [qian],
    comments: 1,
    updatedAt: '2026-01-06T09:00:00+08:00',
    createdAt: '2025-12-20T10:10:00+08:00',
    priority: 'p3',
    project: 'HookCode',
    summary: {
      zh: '空状态缺少引导，需要统一语言与样式规范。',
      en: 'Empty state lacks guidance; standardize copy and styling.'
    }
  }
];

export const labelCatalog = labels;
export const userCatalog = users;
