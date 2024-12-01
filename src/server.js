import express from 'express';

import pino from 'pino-http';

import cors from 'cors';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './router/contacts.js';

const PORT = Number(env('PORT', 3001));


export const setupServer = () => {
  const app = express();

  app.use(cors());

  const logger = pino({
    transport: {
      target: "pino-pretty",
    }
  });

  // app.use(logger);

  app.use(express.json());

  app.use("/contacts",router);

  app.use("*", notFoundHandler);


  app.use(errorHandler);




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

};


