import Order from '../models/Order.js';

// add order
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

//get order

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json('There is no order by that id');
  }
};

//get orders for admin

export const getOrders = async (req, res) => {
  const orders = await Order.find()
    .select('isPaid paidAt isDelivered deliveredAt totalPrice createdAt')
    .populate('user username')
    .exec();

  res.status(200).json(orders);
};

//get user orders

export const getUserOrder = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json('you have no orders');
  }
};

//delete order

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'order has been deleted',
      id: req.params.id,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// update order to paid

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(req.body);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json('There is no order by that id');
  }
};

// update order to delivered
export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ deliveredAt: updatedOrder.deliveredAt, id: updatedOrder._id });
  } else {
    res.status(404).jason({ message: 'Order not found' });
  }
};
