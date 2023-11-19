import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import authRouter from "./routes/auth.js";
import sensorsRouter from "./routes/sensors.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use( express.json() );
expressApp.use( express.text() );

expressApp.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

expressApp.use( '/v1/auth', authRouter );
expressApp.use( '/v1/sensors', sensorsRouter );

const bootstrap = async () => {

  await mongoose.connect( process.env.MONGODB_URL );

  expressApp.listen ( PORT, () => 
    console.log( `Servidor levantado en el puerto: ${PORT}` )
  );

}

bootstrap();
