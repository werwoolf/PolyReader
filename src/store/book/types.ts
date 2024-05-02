import { Book } from "../books/types";

export interface BookState {
  book: Book | null;
  pages: string[];
  currentPage: number;
  isLoading: boolean;
}