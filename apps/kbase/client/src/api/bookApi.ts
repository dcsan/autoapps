import {
  BookGraph,
  BookNode,
  BookEdge,
  // bookData
} from "../data/bookData";

export class BookApi {
  static async getBook(id: string): Promise<BookGraph> {
    const uri = `/api/book/${id}.json`;
    const response = await fetch(uri);
    console.log(uri);
    const json = (await response.json()) as BookGraph;
    console.log("json", json);
    // const data = json.find((book) => book.id === id);
    const data = json;
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

  // all links for node
  static async getLinks(
    bookId?: string,
    nodeId?: string
  ): Promise<BookEdge[] | null> {
    if (!nodeId || !bookId) {
      return null;
    }
    const oneBook = await BookApi.getBook(bookId);
    const edgeData = oneBook?.edges.filter((edge: BookEdge) => {
      if (edge.from === nodeId || edge.to === nodeId) {
        return edge;
      }
    });
    if (!edgeData) {
      console.error("edges not found", { bookName: bookId, nodeId });
      // throw new Error(`Node not found:`);
    }
    return edgeData;
  }
}
