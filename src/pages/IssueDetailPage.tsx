import type { CSSProperties } from 'react';
import { getLocalizedString, useI18n } from '../i18n';
import type { Issue } from '../types';
import { formatRelativeDate } from '../utils/date';

export const IssueDetailPage = ({
  issue,
  onBack,
  onGoToIssue,
  previousIssue,
  nextIssue
}: {
  issue: Issue | null;
  onBack: () => void;
  onGoToIssue: (id: string) => void;
  previousIssue: Issue | null;
  nextIssue: Issue | null;
}) => {
  const { copy, language, locale } = useI18n();

  if (!issue) {
    return (
      <>
        <div className="detail-page-top">
          <button className="ghost-button" type="button" onClick={onBack}>
            ← {copy.detailPage.back}
          </button>
        </div>
        <div className="panel">
          <h2 className="detail-page-title">{copy.detailPage.notFoundTitle}</h2>
          <p className="muted">{copy.detailPage.notFoundBody}</p>
        </div>
      </>
    );
  }

  const title = getLocalizedString(issue.title, language);
  const summary = getLocalizedString(issue.summary, language);

  return (
    <>
      <div className="detail-page-top">
        <button className="ghost-button" type="button" onClick={onBack}>
          ← {copy.detailPage.back}
        </button>
        <div className="detail-page-nav">
          <button
            className="ghost-button"
            type="button"
            onClick={() => previousIssue && onGoToIssue(previousIssue.id)}
            disabled={!previousIssue}
          >
            {copy.detailPage.previous}
          </button>
          <button
            className="ghost-button"
            type="button"
            onClick={() => nextIssue && onGoToIssue(nextIssue.id)}
            disabled={!nextIssue}
          >
            {copy.detailPage.next}
          </button>
        </div>
      </div>

      <div className="panel">
        <p className="page-kicker">{copy.detailPage.kicker}</p>
        <div className="detail-header">
          <div>
            <p className="detail-kicker">#{issue.number}</p>
            <h1 className="detail-page-title">{title}</h1>
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
      </div>

      <div className="panel">
        <div className="panel-header">
          <p className="panel-title">{copy.detailPage.discussionTitle}</p>
          <span className="panel-meta">{copy.detailPage.discussionMeta(issue.comments)}</span>
        </div>
        <p className="panel-body">{copy.detailPage.discussionBody}</p>
        <button className="primary-button" type="button">
          {copy.detailPage.reply}
        </button>
      </div>
    </>
  );
};

