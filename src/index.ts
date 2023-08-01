import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import "reflect-metadata";
import "./infra/database/connect";
import "dotenv/config";

import swaggerDocs from "./swagger.json";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
