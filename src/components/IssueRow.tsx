import type { CSSProperties } from 'react';
import { getLocalizedString, useI18n } from '../i18n';
import type { Issue } from '../types';
import { formatRelativeDate } from '../utils/date';

interface IssueRowProps {
  issue: Issue;
  selected: boolean;
  index: number;
  onSelect: (id: string) => void;
}

export const IssueRow = ({ issue, selected, index, onSelect }: IssueRowProps) => {
  const { copy, language, locale } = useI18n();
  const rowStyle: CSSProperties = {
    '--delay': `${index * 45}ms`
  } as CSSProperties;

  const title = getLocalizedString(issue.title, language);

  return (
    <button
      className={`issue-row ${selected ? 'selected' : ''}`}
      type="button"
      onClick={() => onSelect(issue.id)}
      style={rowStyle}
    >
      <div className="issue-icon" aria-hidden="true">
        <span className={`status-dot ${issue.status}`} />
      </div>
      <div className="issue-content">
        <div className="issue-title-row">
          <h3>{title}</h3>
          <span className={`status-pill ${issue.status}`}>{copy.issue.status[issue.status]}</span>
        </div>
        <div className="issue-meta">
          <span>#{issue.number}</span>
          <span>{copy.issue.createdBy(issue.author.name)}</span>
          <span>{copy.issue.updatedAt(formatRelativeDate(issue.updatedAt, locale))}</span>
          <span className={`priority ${issue.priority}`}>{copy.issue.priority[issue.priority]}</span>
        </div>
        <div className="issue-labels">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="label-pill"
              style={{ '--label': label.color } as CSSProperties}
            >
              {copy.labelNames[label.id] ?? label.name}
            </span>
          ))}
        </div>
      </div>
      <div className="issue-side">
        <div className="issue-avatars">
          {issue.assignees.map((assignee) => (
            <span key={assignee.id} className="mini-avatar" aria-label={assignee.name}>
              {assignee.name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </span>
          ))}
        </div>
        <div className="issue-comments">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 5h14v10H8l-3 3V5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{issue.comments}</span>
        </div>
      </div>
    </button>
  );
};
