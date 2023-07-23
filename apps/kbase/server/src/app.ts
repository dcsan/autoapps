import express from "express";

require("dotenv").config();
const port = process.env.PORT || 3000;

import { addAuctionRoutes } from "./routes/auctions";
import { addBidRoutes } from "./routes/bids";
import { addUserRoutes } from "./routes/users";
import { addNotFoundRoutes } from "./routes/notFound";
import { addUtilRoutes } from "./routes/utils";
import { fusionRouter } from "./routes/fusion";

// const mysql = require("mysql2");
// const connection = mysql.createConnection(process.env.DATABASE_URL);

// connection.connect();

// app.get("/", (req: any, res: any) => {
//   connection.query("SELECT * FROM users", function (err, rows, fields) {
//     if (err) throw err;

//     res.send(rows);
//   });
// });

async function main() {
  const app = express();
  app.use(express.json());

  addAuctionRoutes(app);
  addBidRoutes(app);
  addUserRoutes(app);
  fusionRouter(app);
  addUtilRoutes(app);

  // has to come last
  addNotFoundRoutes(app);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

main()
  .then(() => {
    console.log("Done");
  })
  .catch((e) => {
    console.error("Error", e);
  });
