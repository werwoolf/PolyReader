import { BookTypeService } from "./book.service";
import * as FileSystem from "expo-file-system";
import JSZip from "jszip";

export class EpubBookService implements BookTypeService {
  async readFile(path: string) {
    const content = await FileSystem.readAsStringAsync(path, { encoding: "base64" });

    const zip = await JSZip.loadAsync(content, { base64: true });

    const text = await this.getBookTextContent(zip);

    return { last_visited_page: 1, text, name: "" };
  }

  private async getBookTextContent(bookZip: JSZip): Promise<string> {
    const content = await bookZip.file("OEBPS/content.opf")?.async("text");

    if (content) {
      const startManifest = content.indexOf("<manifest>");
      const endManifest = content.indexOf("</manifest>");

      const manifestContent = content.slice(startManifest + "<manifest>".length, endManifest);

      const items = manifestContent.match(/<item[^>]*\/>/g) || [];
      const htmlHrefs = items
        .map(item => item.match(/href="([^"]*\.html)"/)?.[0].replace("href=\"", "").replace("\"", ""))
        .filter(Boolean);



    }

    // for await (const [key, file] of Object.entries(bookZip.files)) {
    //   console.log("start: ", file.name);
    //   const res = await file.async("text");
    //
    //   // if (file.name.startsWith("OEBPS/3599586769249772871_73604-h-0.htm.html")){
    //     console.log(res)
    // }
    return "";
  }

}
