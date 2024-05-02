export type Book = {
  id: number;
  name: string;
  text: string;
}

export interface BooksState {
  books: Book[];
  isLoading: boolean;
}
