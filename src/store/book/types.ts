import { Book } from "../books/types";

export interface BookState {
  book: Book | null;
  statistic: null | BookStatistic,
  pages: string[];
  currentPage: number;
  isLoading: boolean;
}

export interface BookStatistic {
  totalWords: number;
  uniqueWords: number;
}

export type Pagination = {
  pages: number,
  currentPage: number
}
