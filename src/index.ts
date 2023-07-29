// import { CreateConsumer } from "./application/usecases/consumer/create-consumer";
// import { UpdateConsumerPicture } from "./application/usecases/consumer/update-consumer-picture";
// import moduleManager from "./infra/module-manager";
// import "./dotenv/config";

// const createConsumer = moduleManager.addSingleton<CreateConsumer>(
//   CreateConsumer,
//   UpdateConsumerPicture
// );

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
