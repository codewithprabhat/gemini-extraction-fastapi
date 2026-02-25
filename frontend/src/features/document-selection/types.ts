export type DocumentCategory = 'income' | 'interest' | 'other';
export type FilterCategory = 'all' | DocumentCategory;
export type DocumentBadge = 'popular' | 'new';

export type DocumentIconKey =
  | 'document'
  | 'health'
  | 'briefcase'
  | 'dollar'
  | 'chart'
  | 'clock'
  | 'trend'
  | 'user'
  | 'home'
  | 'more';

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  category: DocumentCategory;
  badge?: DocumentBadge;
  icon: DocumentIconKey;
  disabled: boolean;
}
