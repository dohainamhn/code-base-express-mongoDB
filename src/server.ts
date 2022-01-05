import MongoDb from './utils/mongoDB';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import getRouters from './routers';

const bootstrapServer = async () => {
  const app = express();
  const { router, nswagerRouter } = await getRouters();

  const PORT = process.env.PORT || 5002;

  app.use(cookieParser());

  app.use('/api', router);
  app.use('/api-doc', nswagerRouter);

  app.listen(PORT, () => {
    console.log(`Server listening on port = ${PORT}`);
  });
};

(async () => {
  dotenv.config();
  const mongoDB = new MongoDb();
  await mongoDB.connect();
  await bootstrapServer();
})();
