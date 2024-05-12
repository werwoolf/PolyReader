import { Book } from "../store/books/types";
import { TxtBookService } from "./txt.book.service";
import { EpubBookService } from "./epub.book.service";

export interface BookTypeService {
  readFile(path: string): Promise<Omit<Book, "id">>;
}

export class BookService {
  private readonly bookTypeService: BookTypeService;

  constructor(filename: string) {
    const fileExtension = this.getFileExtension(filename);

    if (fileExtension === "txt") {
      this.bookTypeService = new TxtBookService();
    } else if (fileExtension === "epub") {
      this.bookTypeService = new EpubBookService();
    } else {
      throw new Error("Invalid extension"); // todo: show error
    }
  }

  readFile(path: string) {
    return this.bookTypeService.readFile(path);
  }

  private getFileExtension(filename: string) {
    const tokens = filename.split(".");
    return tokens.at(-1);
  }
}
