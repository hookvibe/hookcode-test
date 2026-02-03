import { useI18n } from '../i18n';
import type { Issue } from '../types';
import { IssueRow } from './IssueRow';

interface IssueListProps {
  issues: Issue[];
  selectedId: string;
  onSelect: (id: string) => void;
  onCreateIssue: () => void;
}

export const IssueList = ({ issues, selectedId, onSelect, onCreateIssue }: IssueListProps) => {
  const { copy } = useI18n();

  if (issues.length === 0) {
    return (
      <div className="empty-state">
        <h3>{copy.empty.title}</h3>
        <p>{copy.empty.body}</p>
        <button className="primary-button" type="button" onClick={onCreateIssue}>
          {copy.empty.action}
        </button>
      </div>
    );
  }

  return (
    <div className="issue-list">
      {issues.map((issue, index) => (
        <IssueRow
          key={issue.id}
          issue={issue}
          selected={issue.id === selectedId}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
