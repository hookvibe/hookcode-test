import type { ChangeEvent } from 'react';
import { useI18n } from '../i18n';
import type { Theme } from '../types';

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onNewIssue: () => void;
}

export const Header = ({ query, onQueryChange, theme, onThemeChange, onNewIssue }: HeaderProps) => {
  const { copy, language, setLanguage } = useI18n();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <header className="header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span />
        </div>
        <div>
          <p className="brand-title">{copy.header.title}</p>
          <p className="brand-subtitle">{copy.header.subtitle}</p>
        </div>
      </div>
      <div className="header-actions">
        <label className="search" aria-label={copy.header.searchLabel}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21 21l-4.35-4.35m1.1-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <input
            value={query}
            onChange={handleChange}
            placeholder={copy.header.searchPlaceholder}
            type="search"
          />
          <span className="kbd">{copy.header.shortcut}</span>
        </label>
        <div className="toggle-group" role="group" aria-label={copy.header.languageLabel}>
          <button
            className={`toggle-button ${language === 'zh' ? 'active' : ''}`}
            type="button"
            aria-pressed={language === 'zh'}
            onClick={() => setLanguage('zh')}
          >
            中
          </button>
          <button
            className={`toggle-button ${language === 'en' ? 'active' : ''}`}
            type="button"
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>
        <div className="toggle-group" role="group" aria-label={copy.header.themeLabel}>
          <button
            className={`toggle-button ${theme === 'system' ? 'active' : ''}`}
            type="button"
            aria-pressed={theme === 'system'}
            onClick={() => onThemeChange('system')}
          >
            {copy.header.theme.system}
          </button>
          <button
            className={`toggle-button ${theme === 'light' ? 'active' : ''}`}
            type="button"
            aria-pressed={theme === 'light'}
            onClick={() => onThemeChange('light')}
          >
            {copy.header.theme.light}
          </button>
          <button
            className={`toggle-button ${theme === 'dark' ? 'active' : ''}`}
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => onThemeChange('dark')}
          >
            {copy.header.theme.dark}
          </button>
        </div>
        <button className="ghost-button" type="button">
          <span className="dot" />
          {copy.header.activity}
        </button>
        <button className="primary-button" type="button" onClick={onNewIssue}>
          {copy.header.newIssue}
        </button>
        <div className="avatar" aria-label={copy.header.currentUser}>
          <span>LC</span>
        </div>
      </div>
    </header>
  );
};
