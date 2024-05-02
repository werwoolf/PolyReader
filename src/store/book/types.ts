import { Book } from "../books/types";

export interface BookState {
  book: Book | null;
  isLoading: boolean;
}
