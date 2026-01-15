import { useI18n } from '../i18n';
import type { Label } from '../types';

interface SidebarProps {
  labels: Label[];
  activeLabel: string;
  labelCounts: Record<string, number>;
  onLabelChange: (value: string) => void;
}

export const Sidebar = ({ labels, activeLabel, labelCounts, onLabelChange }: SidebarProps) => {
  const { copy } = useI18n();
  const totalCount = Object.values(labelCounts).reduce((acc, value) => acc + value, 0);

  return (
    <aside className="sidebar">
      <div className="panel">
        <p className="panel-title">{copy.sidebar.quickView}</p>
        <div className="nav-list">
          <button className="nav-item active" type="button">
            <span>{copy.sidebar.allIssues}</span>
            <span className="nav-count">{totalCount}</span>
          </button>
          <button className="nav-item" type="button">
            <span>{copy.sidebar.assignedToMe}</span>
            <span className="nav-count">4</span>
          </button>
          <button className="nav-item" type="button">
            <span>{copy.sidebar.reviewNeeded}</span>
            <span className="nav-count">2</span>
          </button>
          <button className="nav-item" type="button">
            <span>{copy.sidebar.watching}</span>
            <span className="nav-count">6</span>
          </button>
        </div>
      </div>
      <div className="panel">
        <div className="panel-header">
          <p className="panel-title">{copy.sidebar.labels}</p>
          <span className="panel-meta">{labels.length}</span>
        </div>
        <div className="label-list">
          <button
            className={`label-item ${activeLabel === 'all' ? 'active' : ''}`}
            type="button"
            onClick={() => onLabelChange('all')}
          >
            <span className="label-dot" style={{ background: '#94a3b8' }} />
            <span>{copy.sidebar.all}</span>
            <span className="label-count">{totalCount}</span>
          </button>
          {labels.map((label) => (
            <button
              key={label.id}
              className={`label-item ${activeLabel === label.id ? 'active' : ''}`}
              type="button"
              onClick={() => onLabelChange(label.id)}
            >
              <span className="label-dot" style={{ background: label.color }} />
              <span>{copy.labelNames[label.id] ?? label.name}</span>
              <span className="label-count">{labelCounts[label.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="panel highlight">
        <p className="panel-title">{copy.sidebar.weeklyGoal}</p>
        <p className="panel-body">{copy.sidebar.weeklyBody}</p>
        <button className="ghost-button full" type="button">
          {copy.sidebar.viewPlan}
        </button>
      </div>
    </aside>
  );
};
