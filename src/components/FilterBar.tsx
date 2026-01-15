import type { ChangeEvent } from 'react';
import { useI18n } from '../i18n';
import type { IssueStatus, Label, User } from '../types';

export type SortKey = 'updated' | 'created' | 'comments';

interface FilterBarProps {
  statusFilter: IssueStatus | 'all';
  onStatusChange: (value: IssueStatus | 'all') => void;
  labelFilter: string;
  onLabelChange: (value: string) => void;
  assigneeFilter: string;
  onAssigneeChange: (value: string) => void;
  labels: Label[];
  assignees: User[];
  sortKey: SortKey;
  onSortChange: (value: SortKey) => void;
}

export const FilterBar = ({
  statusFilter,
  onStatusChange,
  labelFilter,
  onLabelChange,
  assigneeFilter,
  onAssigneeChange,
  labels,
  assignees,
  sortKey,
  onSortChange
}: FilterBarProps) => {
  const { copy } = useI18n();
  const handleLabelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onLabelChange(event.target.value);
  };

  const handleAssigneeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onAssigneeChange(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortKey);
  };

  return (
    <div className="filter-bar">
      <div className="status-toggle" role="tablist" aria-label={copy.filters.statusLabel}>
        {['all', 'open', 'closed'].map((status) => (
          <button
            key={status}
            type="button"
            className={statusFilter === status ? 'active' : ''}
            onClick={() => onStatusChange(status as IssueStatus | 'all')}
          >
            {status === 'all' ? copy.filters.all : status === 'open' ? copy.filters.open : copy.filters.closed}
          </button>
        ))}
      </div>
      <div className="filter-controls">
        <label className="filter-select">
          <span>{copy.filters.label}</span>
          <select value={labelFilter} onChange={handleLabelChange}>
            <option value="all">{copy.filters.allLabels}</option>
            {labels.map((label) => (
              <option key={label.id} value={label.id}>
                {copy.labelNames[label.id] ?? label.name}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-select">
          <span>{copy.filters.assignee}</span>
          <select value={assigneeFilter} onChange={handleAssigneeChange}>
            <option value="all">{copy.filters.allAssignees}</option>
            {assignees.map((assignee) => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-select">
          <span>{copy.filters.sort}</span>
          <select value={sortKey} onChange={handleSortChange}>
            <option value="updated">{copy.filters.updated}</option>
            <option value="created">{copy.filters.created}</option>
            <option value="comments">{copy.filters.comments}</option>
          </select>
        </label>
      </div>
    </div>
  );
};
