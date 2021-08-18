import Order from '../models/Order.js';

export const addOrder = async (req, res) => {
  const data = { ...req.body.order, user: req.user._id };
  console.log('data', data);
  if (data.orderItems && data.orderItems.length === 0) {
    return next(new ErrorResponse('No order items', 400));
  } else {
    const order = new Order(data);
    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order.user !== req.user._id) {
    return next(new ErrorResponse('Not authorized to access this router', 401));
  }

  res.status(200).json(order);
};
