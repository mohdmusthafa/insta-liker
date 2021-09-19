import express from 'express';
import cors from 'cors';
import APIRouter from './APIRouter';

const PORT = process.env.API_PORT || 3001;

const app = express();

export default function () {
  app.use(cors());
  app.use(express.json());


  app.use("/api", APIRouter);

  app.listen(PORT, () => {
    console.log(`API v1 -> http://localhost:${PORT}/api 🛡`);
  });
}
