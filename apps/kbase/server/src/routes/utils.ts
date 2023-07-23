//The 404 Route (ALWAYS Keep this as the last route)
import Log from "debug-level";
import { Loader } from "../models/Loader";
const clog = new Log("api.utils");

export function addUtilRoutes(app: any) {
  clog.log("adding util routes", app);
  app.get("/api/ping", async (req: any, res: any) => {
    res.status(200).json({
      data: {
        message: "pong",
      },
    });
  });

  // app.get("/api/reset", async (req: any, res: any) => {
  //   const id = Number(req.params.id);
  //   Loader.loadAll();
  //   res.status(200).json({ data: "ok" });
  // });
}
