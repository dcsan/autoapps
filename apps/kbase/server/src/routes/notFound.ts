//The 404 Route (ALWAYS Keep this as the last route)
import Log from "debug-level";
const clog = new Log("api.404");

function handleNotFound(req: any, res: any) {
  clog.error("Not found", req.url);
  res.status(404).json({ error: "Not found" });
}

export function addNotFoundRoutes(app: any) {
  app.post("*", function (req: any, res: any) {
    return handleNotFound(req, res);
  });

  app.get("*", function (req: any, res: any) {
    return handleNotFound(req, res);
  });
}
