import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'dotenv/config';
import './infra/controllers/index';

import swaggerDocs from './swagger.json';
import './infra/database/connect';
import { myContainer } from './infra/shared/container/inversify.container';

const PORT = process.env.PORT || 3000;

const server = new InversifyExpressServer(myContainer, null, { rootPath: '/api' });
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

const app = server.build();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
