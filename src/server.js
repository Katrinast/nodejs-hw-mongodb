import express from 'express';

import pino from 'pino-http';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './router/contacts.js';
import router from '../src/router/index.js';

const PORT = Number(env('PORT', 3001));


export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());

  const logger = pino({
    transport: {
      target: "pino-pretty",
    }
  });

  // app.use(logger);

  app.use(express.json());

  app.use(contactsRouter);
   app.use(router);

  app.use("*", notFoundHandler);


  app.use(errorHandler);




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

};


