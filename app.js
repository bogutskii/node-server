const express = require('express');

const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const bodyParser = require('body-Parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content_Type, Accept, Autorization');
  if (req.method === 'OPTIONS') {
    re.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELET, GET ');
    return res.status(200).json({});
  }
});
// Routes wich should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
