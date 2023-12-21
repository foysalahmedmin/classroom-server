import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to classroom server!');
});

export default app;
