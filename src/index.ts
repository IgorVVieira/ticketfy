import express from "express";
import routes from "./routes";
import "reflect-metadata";
import "./infra/database/connect";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// npx typeorm-ts-node-esm migration:run -d src/data-source.ts
