const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter.js');
const { BadRequest } = require('./utils/errors');
const { DB_CONN_ERROR } = require('./utils/error_messages');

require('dotenv').config();

const { DB_ADRESS, NODE_ENV } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : 'mongodb://localhost:27017/filmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('error', () => {
  throw new BadRequest(DB_CONN_ERROR);
});

const router = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
