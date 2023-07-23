import { prisma } from "../lib/prisma";
import { loadCsv } from "../lib/dclib/csvUtils";
import { Log, logger } from "debug-level";
import { Loader } from "../models/Loader";

const clog = new Log("reset");

async function main() {
  const what = process.argv[2];
  if (!what || what === "all") {
    await Loader.loadAll();
  } else {
    clog.log("loading", what);
    await Loader.load(what);
    return;
  }
  // await Loader.load("Auction");
  // await Loader.read("Auction");
}

main()
  .then(() => clog.log("done"))
  .catch((e) => {
    clog.error(e);
  });
