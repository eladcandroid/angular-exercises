/**
 * Library app models for Storybook exercise module
 * Models for books, loans, and library statistics
 */

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: BookCategory;
  publishYear: number;
  coverUrl?: string;
  description?: string;
  pages: number;
  available: boolean;
  rating?: number;
}

export type BookCategory =
  | 'מדע בדיוני'
  | 'מתח'
  | 'רומנטיקה'
  | 'ביוגרפיה'
  | 'היסטוריה'
  | 'פנטזיה'
  | 'מדע';

export interface Loan {
  id: number;
  book: Book;
  borrower: string;
  borrowerEmail: string;
  borrowerPhone?: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: LoanStatus;
}

export type LoanStatus = 'active' | 'overdue' | 'returned';

export interface LoanStats {
  totalLoans: number;
  activeLoans: number;
  overdueLoans: number;
  returnedLoans: number;
  popularBooks: Book[];
}

export interface BorrowerInfo {
  name: string;
  email: string;
  phone?: string;
}
