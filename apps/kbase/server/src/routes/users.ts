import { prisma } from "../lib/prisma";
import Log from "debug-level";
import { Loader } from "../models/Loader";
const clog = new Log("api.users");

export function addUserRoutes(app: any) {
  app.get("/api/users", async (req: any, res: any) => {
    try {
      const users = await prisma.user.findMany({});
      res.status(200).json(users);
    } catch (e) {
      console.error("Request error", e);
      res.status(500).json({ error: "api/users error" });
    }
  });

  app.get("/api/user/:userId", async (req: any, res: any) => {
    const id = req.params.userId;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          deck: {
            include: {
              baseCard: true,
            },
          },
        },
      });
      res.status(200).json({ data: user });
    } catch (e) {
      console.error("Request error", e);
      res.status(500).json({ error: "api/users error" });
    }
  });

  app.get("/api/ping", async (req: any, res: any) => {
    res.status(200).json({ data: "pong" });
  });

  app.get("/api/reset/:appId", async (req: any, res: any) => {
    const appId = req.params.appId;
    await Loader.loadAll();
    res.status(200).json({ data: "ok" });
  });
}
