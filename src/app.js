import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';

const {
  PORT = 3000,
  MONGO_HOST,
  MONGO_USER,
  MONGO_PASSWORD,
} = process.env;

if (!MONGO_HOST || !MONGO_USER || !MONGO_PASSWORD) {
  throw new Error('Необходимо задать переменные окружения: MONGO_HOST, MONGO_USER, MONGO_PASSWORD');
}

const app = express();

mongoose.connect(`mongodb://${MONGO_HOST}:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
});

app.get('/', (req, res) => {
  res.send(`Переменная окружения MONGO_USER=${MONGO_USER}`);
})

app.use('/shared', express.static('shared'));

console.log(process.env.MONGO_HOST);
console.log(process.env.MONGO_PASSWORD);

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
