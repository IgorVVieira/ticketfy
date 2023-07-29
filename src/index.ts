import { CreateConsumer } from "./application/usecases/consumer/create-consumer";
import { UpdateConsumerPicture } from "./application/usecases/consumer/update-consumer-picture";
import moduleManager from "./infra/module-manager";
import "./dotenv/config";

const createConsumer = moduleManager.addSingleton<CreateConsumer>(
  CreateConsumer,
  UpdateConsumerPicture
);
