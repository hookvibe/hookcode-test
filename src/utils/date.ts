export const formatRelativeDate = (isoDate: string, locale: string, now: Date = new Date()): string => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const date = new Date(isoDate);
  const diffMs = date.getTime() - now.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(diffSeconds, 'second');
  }
  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, 'minute');
  }
  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, 'hour');
  }
  if (Math.abs(diffDays) < 7) {
    return rtf.format(diffDays, 'day');
  }
  const diffWeeks = Math.round(diffDays / 7);
  if (Math.abs(diffWeeks) < 4) {
    return rtf.format(diffWeeks, 'week');
  }
  const diffMonths = Math.round(diffDays / 30);
  if (Math.abs(diffMonths) < 12) {
    return rtf.format(diffMonths, 'month');
  }
  const diffYears = Math.round(diffDays / 365);
  return rtf.format(diffYears, 'year');
};
