export type BookNode = {
  id: string;
  text: string;
  keywords: string[];
  label?: string;
  links?: string[];
};

export type BookEdge = {
  id: string;
  text: string;
  from: string;
  to: string;
  type: string; // category
  label?: string;
};

export type BookGraph = {
  // id: string;
  nodes: BookNode[];
  edges: BookEdge[];
};

// export const bookData: BookGraph[] = [
//   {
//     id: "negotiation",
//     nodes: [
//       {
//         id: "node1",
//         text: "It all starts with the universally applicable premise that people want to be understood and accepted. Listening is the cheapest, yet most effective concession we can make to get there. By listening intensely, a negotiator demonstrates empathy and shows a sincere desire to better understand what the other side is experiencing.",
//         keywords: ["red", "green"],
//         label: "listening",
//         links: ["node2"],
//       },
//       {
//         id: "node2",
//         text: "Effective negotiation is applied people smarts, a psychological edge in every domain of life: how to size someone up, how to influence their sizing up of you, and how to use that knowledge to get what you want.",
//         keywords: ["blue", "green"],
//         label: "negotiation",
//         links: ["node1"],
//       },
//     ],

//     edges: [
//       {
//         from: "node1",
//         to: "node2",
//         type: "similarity",
//         description: "some more on the relation between 1 and 2",
//       },
//     ],
//   },
// ];
