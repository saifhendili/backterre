import express from 'express';
import Order from '../models/orderModel';
// import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});
router.get('/mine', async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send('Order Not Found.');
  }
});

router.delete('/:id', async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send('Order Not Found.');
  }
});

router.post('/', async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    // user: req.user._id,
    // shipping: req.body.shipping,
    Address: req.body.Address,
    Ville: req.body.Ville,
    Code: req.body.Code,
    Pays: req.body.Pays,
    // totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
});

export default router;
