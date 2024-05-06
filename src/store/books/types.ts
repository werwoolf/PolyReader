export type Book = {
  id: number;
  name: string;
  text: string;
  last_visited_page: number | null
}

export interface BooksState {
  books: Book[];
  isLoading: boolean;
}
