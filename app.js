const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  res.json({ message: 'Awesome it works 🐻 and You are standing at Home page.' });
});

app.use('/api', require('./routes/api.routes'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log({
  Home: `🚀 @ http://localhost:${PORT}`,
  Routing: `🚀 @ http://localhost:${PORT}/api`,
  Users: `🚀 @ http://localhost:${PORT}/api/users`,
  Blogs: `🚀 @ http://localhost:${PORT}/api/blogs`
}));
