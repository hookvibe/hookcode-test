import { useI18n } from '../i18n';

interface StatsBarProps {
  total: number;
  openCount: number;
  closedCount: number;
}

export const StatsBar = ({ total, openCount, closedCount }: StatsBarProps) => {
  const { copy } = useI18n();
  return (
    <div className="stats-bar">
      <div>
        <p className="stat-label">{copy.stats.total}</p>
        <p className="stat-value">{total}</p>
      </div>
      <div>
        <p className="stat-label">{copy.stats.open}</p>
        <p className="stat-value open">{openCount}</p>
      </div>
      <div>
        <p className="stat-label">{copy.stats.closed}</p>
        <p className="stat-value closed">{closedCount}</p>
      </div>
      <div>
        <p className="stat-label">{copy.stats.response}</p>
        <p className="stat-value">4.6h</p>
      </div>
      <div>
        <p className="stat-label">{copy.stats.done}</p>
        <p className="stat-value">12</p>
      </div>
    </div>
  );
};
