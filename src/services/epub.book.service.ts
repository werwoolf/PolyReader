import { BookTypeService } from "./book.service";
import * as FileSystem from "expo-file-system";
import JSZip from "jszip";

export class EpubBookService implements BookTypeService {
  async readFile(path: string) {
    const content = await FileSystem.readAsStringAsync(path, { encoding: "base64" });

    const zip = await JSZip.loadAsync(content, { base64: true });

    const text = await this.getBookTextContent(zip);

    return { last_visited_page: 1, text, name: path };
  }

  private async getBookTextContent(bookZip: JSZip): Promise<string> {
    const content = await bookZip.file("OEBPS/content.opf")?.async("text");
    let parsedContent = "";

    if (!content) return "";// todo: error
    const startManifest = content.indexOf("<manifest>");
    const endManifest = content.indexOf("</manifest>");

    const manifestContent = content.slice(startManifest + "<manifest>".length, endManifest);

    const items = manifestContent.match(/<item[^>]*\/>/g) || [];
    const htmlHrefs = items
      .map(item => item.match(/href="([^"]*\.html)"/)?.[0].replace("href=\"", "").replace("\"", ""))
      .filter(Boolean);

    for await (const href of htmlHrefs) {
      const readItem = await bookZip.file("OEBPS/" + href)?.async("text");

      parsedContent += readItem;
    }

    return parsedContent;
  }

}
