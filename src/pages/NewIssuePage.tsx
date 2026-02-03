import { useMemo, useState, type CSSProperties } from 'react';
import { getLocalizedString, useI18n } from '../i18n';
import type { Issue, Label, Priority, User } from '../types';

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
};

export const NewIssuePage = ({
  labels,
  users,
  nextNumber,
  onCancel,
  onCreate
}: {
  labels: Label[];
  users: User[];
  nextNumber: number;
  onCancel: () => void;
  onCreate: (issue: Issue) => void;
}) => {
  const { copy, language } = useI18n();
  const [titleZh, setTitleZh] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [summaryZh, setSummaryZh] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [project, setProject] = useState('HookCode');
  const [priority, setPriority] = useState<Priority>('p2');
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultAuthor = users[0];
  const localizedPreviewTitle = useMemo(() => {
    const fallback = language === 'zh' ? titleEn : titleZh;
    return getLocalizedString(
      {
        zh: titleZh || fallback || copy.newIssuePage.previewFallback,
        en: titleEn || fallback || copy.newIssuePage.previewFallback
      },
      language
    );
  }, [copy.newIssuePage.previewFallback, language, titleEn, titleZh]);

  const toggleSelection = (value: string, selected: string[], setSelected: (next: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
      return;
    }
    setSelected([...selected, value]);
  };

  const handleSubmit = () => {
    setError(null);
    const resolvedTitleZh = titleZh.trim() || titleEn.trim();
    const resolvedTitleEn = titleEn.trim() || titleZh.trim();
    if (!resolvedTitleZh && !resolvedTitleEn) {
      setError(copy.newIssuePage.validationTitleRequired);
      return;
    }
    if (!defaultAuthor) {
      setError(copy.newIssuePage.validationUserRequired);
      return;
    }

    setIsSubmitting(true);
    const now = new Date().toISOString();
    const createdIssue: Issue = {
      id: `ISSUE-${nextNumber}`,
      number: nextNumber,
      title: {
        zh: resolvedTitleZh,
        en: resolvedTitleEn
      },
      status: 'open',
      labels: labels.filter((label) => selectedLabelIds.includes(label.id)),
      author: defaultAuthor,
      assignees: users.filter((user) => selectedUserIds.includes(user.id)),
      comments: 0,
      updatedAt: now,
      createdAt: now,
      priority,
      project: project.trim() || 'HookCode',
      summary: {
        zh: summaryZh.trim() || summaryEn.trim() || copy.newIssuePage.summaryFallback,
        en: summaryEn.trim() || summaryZh.trim() || copy.newIssuePage.summaryFallback
      }
    };

    onCreate(createdIssue);
  };

  return (
    <>
      <div className="detail-page-top">
        <button className="ghost-button" type="button" onClick={onCancel}>
          ← {copy.newIssuePage.back}
        </button>
      </div>

      <div className="panel ui-change-highlight">
        <p className="page-kicker">{copy.newIssuePage.kicker}</p>
        <div className="new-issue-header">
          <div>
            <h1 className="detail-page-title">{copy.newIssuePage.title}</h1>
            <p className="muted">{copy.newIssuePage.subtitle}</p>
          </div>
          <div className="new-issue-preview" aria-label={copy.newIssuePage.previewLabel}>
            <span className="new-issue-preview-kicker">{copy.newIssuePage.previewKicker}</span>
            <span className="new-issue-preview-title">{localizedPreviewTitle}</span>
          </div>
        </div>

        <div className="highlight-callout" role="note">
          <span className="highlight-dot" aria-hidden="true" />
          <p>{copy.newIssuePage.highlightNote}</p>
        </div>

        <div className="new-issue-form" role="form" aria-label={copy.newIssuePage.formLabel}>
          <div className="form-row">
            <label className="field">
              <span className="field-label">{copy.newIssuePage.fields.titleZh}</span>
              <input
                className="field-input"
                value={titleZh}
                onChange={(event) => setTitleZh(event.target.value)}
                placeholder={copy.newIssuePage.placeholders.titleZh}
                type="text"
                autoComplete="off"
              />
            </label>
            <label className="field">
              <span className="field-label">{copy.newIssuePage.fields.titleEn}</span>
              <input
                className="field-input"
                value={titleEn}
                onChange={(event) => setTitleEn(event.target.value)}
                placeholder={copy.newIssuePage.placeholders.titleEn}
                type="text"
                autoComplete="off"
              />
            </label>
          </div>

          <div className="form-row">
            <label className="field">
              <span className="field-label">{copy.newIssuePage.fields.summaryZh}</span>
              <textarea
                className="field-textarea"
                value={summaryZh}
                onChange={(event) => setSummaryZh(event.target.value)}
                placeholder={copy.newIssuePage.placeholders.summaryZh}
              />
            </label>
            <label className="field">
              <span className="field-label">{copy.newIssuePage.fields.summaryEn}</span>
              <textarea
                className="field-textarea"
                value={summaryEn}
                onChange={(event) => setSummaryEn(event.target.value)}
                placeholder={copy.newIssuePage.placeholders.summaryEn}
              />
            </label>
          </div>

          <div className="form-row form-row-compact">
            <label className="field">
              <span className="field-label">{copy.newIssuePage.fields.project}</span>
              <input
                className="field-input"
                value={project}
                onChange={(event) => setProject(event.target.value)}
                placeholder={copy.newIssuePage.placeholders.project}
                type="text"
                autoComplete="off"
              />
            </label>

            <label className="field">
              <span className="field-label">{copy.newIssuePage.fields.priority}</span>
              <select
                className="field-input"
                value={priority}
                onChange={(event) => setPriority(event.target.value as Priority)}
              >
                <option value="p0">{copy.issue.priority.p0}</option>
                <option value="p1">{copy.issue.priority.p1}</option>
                <option value="p2">{copy.issue.priority.p2}</option>
                <option value="p3">{copy.issue.priority.p3}</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <div className="field">
              <span className="field-label">{copy.newIssuePage.fields.labels}</span>
              <div className="pill-grid" role="group" aria-label={copy.newIssuePage.fields.labels}>
                {labels.map((label) => {
                  const selected = selectedLabelIds.includes(label.id);
                  return (
                    <button
                      key={label.id}
                      type="button"
                      className={`select-pill ${selected ? 'selected' : ''}`}
                      onClick={() => toggleSelection(label.id, selectedLabelIds, setSelectedLabelIds)}
                      aria-pressed={selected}
                      style={{ '--pill': label.color } as CSSProperties}
                    >
                      <span className="select-pill-dot" aria-hidden="true" />
                      {copy.labelNames[label.id] ?? label.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="field">
              <span className="field-label">{copy.newIssuePage.fields.assignees}</span>
              <div className="pill-grid" role="group" aria-label={copy.newIssuePage.fields.assignees}>
                {users.map((user) => {
                  const selected = selectedUserIds.includes(user.id);
                  return (
                    <button
                      key={user.id}
                      type="button"
                      className={`select-pill ${selected ? 'selected' : ''}`}
                      onClick={() => toggleSelection(user.id, selectedUserIds, setSelectedUserIds)}
                      aria-pressed={selected}
                    >
                      <span className="select-pill-avatar" aria-hidden="true">
                        {getInitials(user.name)}
                      </span>
                      {user.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error ? (
            <div className="form-alert" role="alert">
              {error}
            </div>
          ) : null}

          <div className="form-actions">
            <button className="ghost-button" type="button" onClick={onCancel} disabled={isSubmitting}>
              {copy.newIssuePage.cancel}
            </button>
            <button className="primary-button" type="button" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? copy.newIssuePage.creating : copy.newIssuePage.create}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
