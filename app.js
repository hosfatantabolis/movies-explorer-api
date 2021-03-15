const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter.js');

require('dotenv').config();

const { DB_ADRESS } = process.env;

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('open', () => {
  console.log('DB connected');
});
mongoose.connection.on('error', () => {
  console.log('DB connection FAILED');
});

const router = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(helmet);
app.use(rateLimiter);
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(router);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
