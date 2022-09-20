import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './src/routes/auth';

dotenv.config();

if (!process.env) {
  throw new Error(`.env file required! Please, create .env`);
}

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router);

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
