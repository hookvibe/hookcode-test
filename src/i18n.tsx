import { createContext, useContext, type ReactNode } from 'react';
import type { Language, LocalizedString } from './types';

const labelNamesZh: Record<string, string> = {
  'label-bug': '缺陷',
  'label-ui': '界面',
  'label-perf': '性能',
  'label-security': '安全',
  'label-docs': '文档',
  'label-feature': '功能',
  'label-design': '设计'
};

const labelNamesEn: Record<string, string> = {
  'label-bug': 'Bug',
  'label-ui': 'UI',
  'label-perf': 'Performance',
  'label-security': 'Security',
  'label-docs': 'Docs',
  'label-feature': 'Feature',
  'label-design': 'Design'
};

const translations = {
  zh: {
    header: {
      title: 'HookCode Issues',
      subtitle: '项目 · issue 管理中心',
      searchPlaceholder: '搜索标题、编号、标签',
      searchLabel: '搜索 issues',
      activity: '活动',
      newIssue: '新建 Issue',
      currentUser: '当前用户',
      themeLabel: '主题',
      languageLabel: '语言',
      theme: {
        light: '浅色',
        dark: '深色',
        system: '跟随系统'
      },
      shortcut: 'Ctrl K'
    },
    page: {
      kicker: 'Issue 列表',
      title: '团队待办追踪',
      subtitle: '聚焦高优先级问题，保持进度透明。',
      export: '导出',
      filters: '过滤器',
      newIssue: '新建 Issue'
    },
    stats: {
      total: '总数',
      open: '开放',
      closed: '已关闭',
      response: '平均响应',
      done: '本周完成'
    },
    filters: {
      statusLabel: '状态筛选',
      all: '全部',
      open: '开放',
      closed: '已关闭',
      label: '标签',
      allLabels: '全部标签',
      assignee: '负责人',
      allAssignees: '全部成员',
      sort: '排序',
      updated: '最近更新',
      created: '创建时间',
      comments: '讨论热度'
    },
    sidebar: {
      quickView: '快捷视图',
      allIssues: '全部 Issue',
      assignedToMe: '我负责的',
      reviewNeeded: '待我审核',
      watching: '已关注',
      labels: '标签',
      all: '全部',
      weeklyGoal: '本周目标',
      weeklyBody: '保持打开 Issue 控制在 20 个以内，重点处理 P0/P1。',
      viewPlan: '查看规划'
    },
    issue: {
      status: {
        open: '开放中',
        closed: '已关闭'
      },
      priority: {
        p0: 'P0 紧急',
        p1: 'P1 高',
        p2: 'P2 中',
        p3: 'P3 低'
      },
      createdBy: (name: string) => `由 ${name} 创建`,
      updatedAt: (relative: string) => `${relative}更新`,
      commentsCount: (count: number) => `${count}`
    },
    detail: {
      emptyTitle: '选择一个 Issue 查看详情',
      emptyBody: '点击列表中的条目进行预览。',
      assignees: '负责人',
      info: '信息',
      tags: '标签',
      project: '项目',
      created: '创建',
      updated: '更新',
      comments: '评论',
      viewDiscussion: '查看完整讨论'
    },
    detailPage: {
      kicker: 'Issue 详情页',
      back: '返回列表',
      backToIssue: '返回 Issue',
      previous: '上一个',
      next: '下一个',
      notFoundTitle: '未找到该 Issue',
      notFoundBody: '请从列表重新进入，或检查链接是否正确。',
      discussionTitle: '讨论（静态占位）',
      discussionMeta: (count: number) => `共 ${count} 条评论`,
      discussionBody: '这里是讨论区域的静态占位内容，后续可接入后端/接口展示真实评论与时间线。',
      discussionSampleNote: '下方为静态示例评论（用于占位展示）。',
      discussionSampleAuthorAction: (name: string) => `${name} 创建了该 Issue`,
      discussionSampleAssigneeAction: (name: string) => `${name} 已确认并开始处理`,
      discussionSampleSystemAction: '系统自动记录：后续可接入时间线/事件流。',
      discussionSampleText1: '我们先对现象做归因，明确复现路径与影响范围。',
      discussionSampleText2: '我会补充埋点与日志，优先把关键链路的状态同步出来。',
      discussionSystemName: '系统',
      replyPlaceholder: '回复功能后续接入，这里先做静态占位。',
      reply: '回复'
    },
    newIssuePage: {
      kicker: '新建 Issue',
      title: '创建一个新的 Issue',
      subtitle: '填写关键信息，提交后会在本地列表中生成（静态演示）。',
      back: '返回列表',
      formLabel: '新建 Issue 表单',
      highlightNote: '本次构建新增：新建 Issue 页面已高亮展示（便于审阅 UI 变更）。',
      previewLabel: '标题预览',
      previewKicker: '预览',
      previewFallback: '未命名 Issue',
      fields: {
        titleZh: '标题（中文）',
        titleEn: '标题（英文）',
        summaryZh: '摘要（中文）',
        summaryEn: '摘要（英文）',
        project: '项目',
        priority: '优先级',
        labels: '标签',
        assignees: '负责人'
      },
      placeholders: {
        titleZh: '例如：登录态在多标签页下异常',
        titleEn: 'e.g. Auth state breaks across tabs',
        summaryZh: '描述问题、复现步骤、期望结果',
        summaryEn: 'Describe problem, repro steps, expected result',
        project: '例如：HookCode'
      },
      cancel: '取消',
      create: '创建 Issue',
      creating: '创建中…',
      validationTitleRequired: '请至少填写一个标题（中文或英文）。',
      validationUserRequired: '没有可用的用户信息，无法创建 Issue。',
      summaryFallback: '（未填写摘要）'
    },
    empty: {
      title: '没有匹配的 Issue',
      body: '尝试调整筛选条件或清空搜索关键词。',
      action: '创建第一个 Issue'
    },
    labelNames: labelNamesZh
  },
  en: {
    header: {
      title: 'HookCode Issues',
      subtitle: 'Project · Issue hub',
      searchPlaceholder: 'Search title, number, labels',
      searchLabel: 'Search issues',
      activity: 'Activity',
      newIssue: 'New Issue',
      currentUser: 'Current user',
      themeLabel: 'Theme',
      languageLabel: 'Language',
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      },
      shortcut: 'Ctrl K'
    },
    page: {
      kicker: 'Issue List',
      title: 'Team Issue Tracking',
      subtitle: 'Focus on high-priority work and keep progress visible.',
      export: 'Export',
      filters: 'Filters',
      newIssue: 'New Issue'
    },
    stats: {
      total: 'Total',
      open: 'Open',
      closed: 'Closed',
      response: 'Avg response',
      done: 'Done this week'
    },
    filters: {
      statusLabel: 'Status filters',
      all: 'All',
      open: 'Open',
      closed: 'Closed',
      label: 'Labels',
      allLabels: 'All labels',
      assignee: 'Assignee',
      allAssignees: 'All members',
      sort: 'Sort',
      updated: 'Recently updated',
      created: 'Created time',
      comments: 'Most discussed'
    },
    sidebar: {
      quickView: 'Quick Views',
      allIssues: 'All Issues',
      assignedToMe: 'Assigned to me',
      reviewNeeded: 'Needs review',
      watching: 'Watching',
      labels: 'Labels',
      all: 'All',
      weeklyGoal: 'Weekly Goal',
      weeklyBody: 'Keep open issues under 20 and prioritize P0/P1.',
      viewPlan: 'View plan'
    },
    issue: {
      status: {
        open: 'Open',
        closed: 'Closed'
      },
      priority: {
        p0: 'P0 Critical',
        p1: 'P1 High',
        p2: 'P2 Medium',
        p3: 'P3 Low'
      },
      createdBy: (name: string) => `Created by ${name}`,
      updatedAt: (relative: string) => `Updated ${relative}`,
      commentsCount: (count: number) => `${count}`
    },
    detail: {
      emptyTitle: 'Select an issue to view details',
      emptyBody: 'Click an item in the list to preview.',
      assignees: 'Assignees',
      info: 'Info',
      tags: 'Labels',
      project: 'Project',
      created: 'Created',
      updated: 'Updated',
      comments: 'Comments',
      viewDiscussion: 'View full discussion'
    },
    detailPage: {
      kicker: 'Issue Details',
      back: 'Back to list',
      backToIssue: 'Back to issue',
      previous: 'Previous',
      next: 'Next',
      notFoundTitle: 'Issue not found',
      notFoundBody: 'Go back to the list or double-check the link.',
      discussionTitle: 'Discussion (static placeholder)',
      discussionMeta: (count: number) => `${count} comments`,
      discussionBody: 'This is a static placeholder. You can wire it up to real comments and timeline later.',
      discussionSampleNote: 'Below are static sample comments (placeholder only).',
      discussionSampleAuthorAction: (name: string) => `${name} opened this issue`,
      discussionSampleAssigneeAction: (name: string) => `${name} acknowledged and started investigating`,
      discussionSampleSystemAction: 'System note: timeline/events can be wired here later.',
      discussionSampleText1: 'Let’s first identify a reliable reproduction path and scope the impact.',
      discussionSampleText2: 'I will add logging/telemetry and share findings as soon as possible.',
      discussionSystemName: 'System',
      replyPlaceholder: 'Reply is coming soon — this is a static placeholder.',
      reply: 'Reply'
    },
    newIssuePage: {
      kicker: 'New Issue',
      title: 'Create a new issue',
      subtitle: 'Fill in key details. On submit, a local issue is added (static demo).',
      back: 'Back to list',
      formLabel: 'New issue form',
      highlightNote: 'Build note: the New Issue page is intentionally highlighted to make UI changes obvious.',
      previewLabel: 'Title preview',
      previewKicker: 'Preview',
      previewFallback: 'Untitled issue',
      fields: {
        titleZh: 'Title (Chinese)',
        titleEn: 'Title (English)',
        summaryZh: 'Summary (Chinese)',
        summaryEn: 'Summary (English)',
        project: 'Project',
        priority: 'Priority',
        labels: 'Labels',
        assignees: 'Assignees'
      },
      placeholders: {
        titleZh: 'e.g. Login state breaks across tabs',
        titleEn: 'e.g. Auth state breaks across tabs',
        summaryZh: 'Describe problem, repro steps, expected result',
        summaryEn: 'Describe problem, repro steps, expected result',
        project: 'e.g. HookCode'
      },
      cancel: 'Cancel',
      create: 'Create issue',
      creating: 'Creating…',
      validationTitleRequired: 'Please fill at least one title (Chinese or English).',
      validationUserRequired: 'No users available; cannot create an issue.',
      summaryFallback: '(No summary provided)'
    },
    empty: {
      title: 'No matching issues',
      body: 'Try adjusting filters or clear the search.',
      action: 'Create first issue'
    },
    labelNames: labelNamesEn
  }
} as const;

export type Copy = (typeof translations)[Language];

export const getCopy = (language: Language): Copy => translations[language];

export const getLocale = (language: Language): string => (language === 'zh' ? 'zh-CN' : 'en-US');

export const getLocalizedString = (value: LocalizedString, language: Language): string => value[language];

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: Copy;
  locale: string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({
  language,
  setLanguage,
  children
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  children: ReactNode;
}) => {
  const copy = getCopy(language);
  const locale = getLocale(language);

  return (
    <I18nContext.Provider value={{ language, setLanguage, copy, locale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
