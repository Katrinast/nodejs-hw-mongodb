import express from 'express';

import pino from 'pino-http';

import cors from 'cors';

import { env } from './utils/env.js';
import * as contactsSevices from '../src/services/contacts.js';

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

  app.get("/contacts", async(req, res) => {
    const data = await contactsSevices.getContacts();

    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data,
    });
  });

  app.get("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const data = await contactsSevices.getContactById(id);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${id} not found`,
      });
}

res.json({
      status: 200,
      message: "Successfully found contact!",
      data,
    });

  });


  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`
    });
   });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

};


