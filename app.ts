import express, { Request, Response } from 'express';
require('dotenv').config()
require("./connection")
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Trying routes!');
});

app.listen(port, () => {
  console.log(`Application running in http://localhost:${port}`);
});