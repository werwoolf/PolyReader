import { BookTypeService } from "./book.service";
import * as FileSystem from "expo-file-system";

export class TxtBookService implements BookTypeService {
  async readFile(path: string) {
    const text = await FileSystem.readAsStringAsync(path);

    return { text, name: "", last_visited_page: 1 };
  }

}
