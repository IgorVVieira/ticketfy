import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Successfully connected to database');
  })
  .catch((error) => console.log(error));
