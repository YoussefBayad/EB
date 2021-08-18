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
  console.log(order.user == req.user._id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json('There is no order by that id');
  }
};

// update order to paid

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatesOrder = await Order.save();

    res.status(200).json(updatesOrder);
  } else {
    res.status(404).json('There is no order by that id');
  }
};
