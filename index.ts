import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './src/core/db';

dotenv.config();

if (!process.env) {
  throw new Error(`.env file required! Please, create .env`);
}

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('It is working...');
});

(async function () {
  try {
    const db = new DB();
    db.connect();

    app.listen(port, () => {
      console.log(`App is running on port ${port}.`);
    });

    console.log('Database connection initialized.');
  } catch (e) {
    throw new Error(`DB connection error: ${e}`);
  }
})();
