import { BookGraph, BookNode, bookData } from "../data/bookData";

export class BookApi {
  static async getBook(id: string): Promise<BookGraph> {
    const data = bookData.find((book) => book.id === id);
    if (!data) {
      throw new Error("Book not found:" + id);
    }
    return data;
  }

  static async getNode(
    bookId?: string,
    nodeId?: string
  ): Promise<BookNode | null> {
    if (!nodeId || !bookId) {
      return null;
    }
    const oneBook = await BookApi.getBook(bookId);
    const nodeData = oneBook?.nodes.find(
      (node: BookNode) => node.id === nodeId
    );
    if (!nodeData) {
      console.error("node not found", { bookName: bookId, nodeId });
      throw new Error(`Node not found:`);
    }
    return nodeData;
  }
}
