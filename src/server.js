import express from 'express';

import pino from 'pino-http';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import router from '../src/router/index.js';

const PORT = Number(env('PORT', 3001));


export const setupServer = () => {
  const app = express();
  app.use(express.json());


  const logger = pino({
    transport: {
      target: "pino-pretty",
    }
  });

  // app.use(logger);

  app.use(cors());
  app.use(cookieParser());




   app.use(router);

  app.use("*", notFoundHandler);


  app.use(errorHandler);




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

};


