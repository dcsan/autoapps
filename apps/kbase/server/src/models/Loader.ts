import { prisma } from "../lib/prisma";
import { loadCsv } from "../lib/dclib/csvUtils";
import { Log, logger } from "debug-level";
import { AuctionFac } from "../models/AuctionFac";

const clog = new Log("Loader");

export class Loader {
  static getFixtures(modelName: string): any[] {
    const filename = `${modelName}.csv`;
    // console.log('loading fixtures: ', filename)
    const rawData = loadCsv(filename);
    console.log("loaded", rawData);
    return rawData;
  }

  static getModel(modelName: string) {
    // @ts-ignore
    return prisma[modelName];
  }

  static async load(modelName: string) {
    clog.log("loading fixtures: ", modelName);
    const model = this.getModel(modelName);
    await model.deleteMany({}).catch((err: any) => {
      clog.error("failed to delete from table", modelName, err);
    });

    const rawData = this.getFixtures(modelName);

    // try {
    //   await model.deleteMany({}).catch((err: any) => {
    //     clog.error("failed to delete from table", modelName, err);
    //   });
    // } catch (err) {
    //   clog.error("failed to delete from table", modelName, err);
    // }

    // @ts-ignore
    // const model = prisma[modelName];
    clog.log("model", modelName, { items: rawData.length });

    let count = 0;
    for (let data of rawData) {
      count++;
      console.log("> load item", count, "of", rawData.length);
      const where = { id: data.id };
      clog.log("findUnique", { data, where });
      const found = await model.findUnique({ where });
      if (found) {
        clog.log("found", found);
        // update
        const updated = await model.update({
          where: { id: data.id },
          data,
        });
        clog.log("updated", updated);
      } else {
        clog.log("create", { data });
        const item = await model.create({
          data,
        });
        clog.log("created", item);
      }
    }

    // for (let data of rawData) {
    //   // TODO warn if not passing string IDs
    //   await this.findOrCreateById(data);
    // }
    // return rawData;
  }

  static async read(modelName: string) {
    const model = this.getModel(modelName);
    const data = await model.findMany();
    clog.log("read", data);
  }

  static async loadAll() {
    // have to delete in order
    await prisma.bid.deleteMany({});
    await prisma.auction.deleteMany({});
    await prisma.userCard.deleteMany({});
    await prisma.baseCard.deleteMany({});

    await this.load("User");
    await this.load("BaseCard");
    await this.load("UserCard");
    await this.load("Auction");
    await this.load("Bid");
    await AuctionFac.resetAllTimes();
  }
}
