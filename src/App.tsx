import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { IssueList } from './components/IssueList';
import { FilterBar, type SortKey } from './components/FilterBar';
import { StatsBar } from './components/StatsBar';
import { issueData, labelCatalog, userCatalog } from './data/issues';
import { getCopy, I18nProvider } from './i18n';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { NewIssuePage } from './pages/NewIssuePage';
import type { Issue, IssueStatus, Language, Theme } from './types';
import { getIssueIdFromRoute, isNewIssueRoute, issueDetailHash, listHash, newIssueHash } from './utils/hashRoute';

const buildLabelCounts = (issues: Issue[]) => {
  return issues.reduce<Record<string, number>>((acc, issue) => {
    issue.labels.forEach((label) => {
      acc[label.id] = (acc[label.id] ?? 0) + 1;
    });
    return acc;
  }, {});
};

const matchesQuery = (issue: Issue, query: string, labelNames: Record<string, string>) => {
  if (!query) return true;
  const normalized = query.toLowerCase();
  const searchableLabels = issue.labels.map((label) => labelNames[label.id] ?? label.name);
  const searchableContent = [
    issue.number.toString(),
    ...Object.values(issue.title),
    ...Object.values(issue.summary),
    ...searchableLabels
  ];

  return (
    searchableContent.some((value) => value.toLowerCase().includes(normalized)) ||
    issue.labels.some((label) => label.name.toLowerCase().includes(normalized))
  );
};

const sortIssues = (issues: Issue[], sortKey: SortKey) => {
  const sorted = [...issues];
  sorted.sort((a, b) => {
    if (sortKey === 'comments') {
      return b.comments - a.comments;
    }
    if (sortKey === 'created') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return sorted;
};

export default function App() {
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash));
  const initialIssueId = useMemo(() => getIssueIdFromRoute(hash), [hash]);

  const [issues, setIssues] = useState<Issue[]>(() => issueData);

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    return 'system';
  });
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'zh';
    const stored = window.localStorage.getItem('language');
    if (stored === 'zh' || stored === 'en') return stored;
    const browser = window.navigator.language.toLowerCase();
    return browser.startsWith('zh') ? 'zh' : 'en';
  });
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('open');
  const [labelFilter, setLabelFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('updated');
  const [selectedId, setSelectedId] = useState(initialIssueId ?? issueData[0]?.id ?? '');

  const copy = useMemo(() => getCopy(language), [language]);
  const labelCounts = useMemo(() => buildLabelCounts(issues), [issues]);
  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const routeIssueId = useMemo(() => getIssueIdFromRoute(hash), [hash]);
  const creatingIssue = useMemo(() => isNewIssueRoute(hash), [hash]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHashChange = () => setHash(window.location.hash);
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => setSystemTheme(media.matches ? 'dark' : 'light');
    updateSystemTheme();
    if (media.addEventListener) {
      media.addEventListener('change', updateSystemTheme);
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        media.removeEventListener('change', updateSystemTheme);
      };
    }
    media.addListener(updateSystemTheme);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      media.removeListener(updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
    window.localStorage.setItem('theme', theme);
  }, [resolvedTheme, theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    window.localStorage.setItem('language', language);
  }, [language]);

  const filteredIssues = useMemo(() => {
    const filtered = issues.filter((issue) => {
      const statusMatch = statusFilter === 'all' || issue.status === statusFilter;
      const labelMatch = labelFilter === 'all' || issue.labels.some((label) => label.id === labelFilter);
      const assigneeMatch =
        assigneeFilter === 'all' || issue.assignees.some((assignee) => assignee.id === assigneeFilter);
      return statusMatch && labelMatch && assigneeMatch && matchesQuery(issue, query, copy.labelNames);
    });

    return sortIssues(filtered, sortKey);
  }, [assigneeFilter, copy.labelNames, issues, labelFilter, query, sortKey, statusFilter]);

  const openCount = filteredIssues.filter((issue) => issue.status === 'open').length;
  const closedCount = filteredIssues.filter((issue) => issue.status === 'closed').length;
  const routeIssue = useMemo(
    () => (routeIssueId ? issues.find((issue) => issue.id === routeIssueId) ?? null : null),
    [issues, routeIssueId]
  );
  const routeIssueIndex = useMemo(() => {
    if (!routeIssueId) return -1;
    return issues.findIndex((issue) => issue.id === routeIssueId);
  }, [issues, routeIssueId]);
  const previousIssue = routeIssueIndex > 0 ? issues[routeIssueIndex - 1] : null;
  const nextIssue =
    routeIssueIndex >= 0 && routeIssueIndex < issues.length - 1 ? issues[routeIssueIndex + 1] : null;

  const nextIssueNumber = useMemo(() => {
    const maxNumber = issues.reduce((max, issue) => Math.max(max, issue.number), 0);
    return maxNumber + 1;
  }, [issues]);

  useEffect(() => {
    if (!routeIssueId) return;
    setSelectedId(routeIssueId);
    if (typeof window === 'undefined') return;
    window.scrollTo(0, 0);
  }, [routeIssueId]);

  return (
    <I18nProvider language={language} setLanguage={setLanguage}>
      <div className="app">
        <Header
          query={query}
          onQueryChange={setQuery}
          theme={theme}
          onThemeChange={setTheme}
          onNewIssue={() => {
            window.location.hash = newIssueHash();
          }}
        />
        <div className={`layout ${routeIssueId || creatingIssue ? 'layout-single' : 'layout-two'}`}>
          {!routeIssueId && !creatingIssue ? (
            <Sidebar
              labels={labelCatalog}
              activeLabel={labelFilter}
              labelCounts={labelCounts}
              onLabelChange={(value) => {
                setLabelFilter(value);
                setSelectedId(issues[0]?.id ?? '');
              }}
            />
          ) : null}
          <main className="main">
            {!routeIssueId && !creatingIssue ? (
              <>
                <div className="page-header">
                  <div>
                    <p className="page-kicker">{copy.page.kicker}</p>
                    <h1>{copy.page.title}</h1>
                    <p className="page-subtitle">{copy.page.subtitle}</p>
                  </div>
                  <div className="page-actions">
                    <button className="ghost-button" type="button">
                      {copy.page.export}
                    </button>
                    <button className="ghost-button" type="button">
                      {copy.page.filters}
                    </button>
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => {
                        window.location.hash = newIssueHash();
                      }}
                    >
                      {copy.page.newIssue}
                    </button>
                  </div>
                </div>
                <StatsBar total={filteredIssues.length} openCount={openCount} closedCount={closedCount} />
                <FilterBar
                  statusFilter={statusFilter}
                  onStatusChange={(value) => {
                    setStatusFilter(value);
                    setSelectedId(issues[0]?.id ?? '');
                  }}
                  labelFilter={labelFilter}
                  onLabelChange={setLabelFilter}
                  assigneeFilter={assigneeFilter}
                  onAssigneeChange={setAssigneeFilter}
                  labels={labelCatalog}
                  assignees={userCatalog}
                  sortKey={sortKey}
                  onSortChange={setSortKey}
                />
                <IssueList
                  issues={filteredIssues}
                  selectedId={selectedId}
                  onSelect={(id) => {
                    setSelectedId(id);
                    window.location.hash = issueDetailHash(id);
                  }}
                  onCreateIssue={() => {
                    window.location.hash = newIssueHash();
                  }}
                />
              </>
            ) : creatingIssue ? (
              <NewIssuePage
                labels={labelCatalog}
                users={userCatalog}
                nextNumber={nextIssueNumber}
                onCancel={() => {
                  window.location.hash = listHash();
                }}
                onCreate={(issue) => {
                  setIssues((current) => [issue, ...current]);
                  setSelectedId(issue.id);
                  window.location.hash = issueDetailHash(issue.id);
                }}
              />
            ) : (
              <IssueDetailPage
                issue={routeIssue}
                onBack={() => {
                  window.location.hash = listHash();
                }}
                onGoToIssue={(id) => {
                  window.location.hash = issueDetailHash(id);
                }}
                previousIssue={previousIssue}
                nextIssue={nextIssue}
              />
            )}
          </main>
        </div>
      </div>
    </I18nProvider>
  );
}
