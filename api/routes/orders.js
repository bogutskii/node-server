const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../../modules/product/productOrder');

// Handle incoming GET request to /orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched',
  });
});
router.post('/', (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  });
  order
    .save()
    .exec()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errror: err,
      });
    });
});
router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    orderId: req.params.orderId,
  });
});
router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order deleted',
    orderId: req.params.orderId,
  });
});

module.exports = router;
