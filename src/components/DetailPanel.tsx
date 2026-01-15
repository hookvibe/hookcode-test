import type { CSSProperties } from 'react';
import { getLocalizedString, useI18n } from '../i18n';
import type { Issue } from '../types';
import { formatRelativeDate } from '../utils/date';

interface DetailPanelProps {
  issue: Issue | null;
}

export const DetailPanel = ({ issue }: DetailPanelProps) => {
  const { copy, language, locale } = useI18n();

  if (!issue) {
    return (
      <aside className="detail-panel">
        <div className="panel">
          <h3>{copy.detail.emptyTitle}</h3>
          <p className="muted">{copy.detail.emptyBody}</p>
        </div>
      </aside>
    );
  }

  const title = getLocalizedString(issue.title, language);
  const summary = getLocalizedString(issue.summary, language);

  return (
    <aside className="detail-panel">
      <div className="panel">
        <div className="detail-header">
          <div>
            <p className="detail-kicker">#{issue.number}</p>
            <h2>{title}</h2>
          </div>
          <span className={`status-pill ${issue.status}`}>{copy.issue.status[issue.status]}</span>
        </div>
        <p className="detail-summary">{summary}</p>
        <div className="detail-section">
          <p className="detail-label">{copy.detail.assignees}</p>
          <div className="detail-people">
            {issue.assignees.map((assignee) => (
              <span key={assignee.id} className="person-chip">
                <span className="mini-avatar">{assignee.name[0]}</span>
                {assignee.name}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-section">
          <p className="detail-label">{copy.detail.info}</p>
          <div className="detail-meta">
            <span>
              {copy.detail.project}：{issue.project}
            </span>
            <span>
              {copy.detail.created}：{formatRelativeDate(issue.createdAt, locale)}
            </span>
            <span>
              {copy.detail.updated}：{formatRelativeDate(issue.updatedAt, locale)}
            </span>
            <span>
              {copy.detail.comments}：{copy.issue.commentsCount(issue.comments)}
            </span>
          </div>
        </div>
        <div className="detail-section">
          <p className="detail-label">{copy.detail.tags}</p>
          <div className="detail-tags">
            {issue.labels.map((label) => (
              <span key={label.id} className="label-pill" style={{ '--label': label.color } as CSSProperties}>
                {copy.labelNames[label.id] ?? label.name}
              </span>
            ))}
          </div>
        </div>
        <button className="ghost-button full" type="button">
          {copy.detail.viewDiscussion}
        </button>
      </div>
    </aside>
  );
};
