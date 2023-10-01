

const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.port || 5000;

const appRoutes = require('./routes');

const {errorHandler} = require('./middleware/errorMiddleware');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', appRoutes);

app.use(errorHandler);



app.listen(
  port,
  () => {console.log(`Server listening on port ${port}...`)}  // callback when started
);

