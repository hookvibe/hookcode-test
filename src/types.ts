export type IssueStatus = 'open' | 'closed';
export type Priority = 'p0' | 'p1' | 'p2' | 'p3';
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'zh' | 'en';

export type LocalizedString = {
  zh: string;
  en: string;
};

export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  role?: string;
}

export interface Issue {
  id: string;
  number: number;
  title: LocalizedString;
  status: IssueStatus;
  labels: Label[];
  author: User;
  assignees: User[];
  comments: number;
  updatedAt: string;
  createdAt: string;
  priority: Priority;
  project: string;
  summary: LocalizedString;
}
