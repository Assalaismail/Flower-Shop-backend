const asyncHandler = require("express-async-handler");
const order = require("../models/order.js");
// const items = require("../models/items.js");


const getAllOrder = async (req, res) => {
  try {
    const orders = await order.find().populate("cart.productID");
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await order.findById(req.params.id)
    if (!orders) {
      return res.status(404).send();
    }
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const setOrder = asyncHandler(async (req, res) => {
  const orders = await order.create({
    cart: req.body.cart,
    payment_type: req.body.payment_type,
    total_price: req.body.total_price,
    phone_number: req.body.phone_number,
    address: req.body.address,
  });

  await orders.save();

  res.status(200).json(orders);
});

const updateOrder = asyncHandler(async (req, res) => {
  const orders = await order.findById(req.params.id);

  if (!orders) {
    res.status(400);
    throw new Error("Order not found");
  }
  console.log(orders.cart);
  const updatedOrder = await order.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedOrder });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const orders = await order.findById(req.params.id);

  if (!orders) {
    res.status(400);
    throw new Error("Order not found");
  }

  await order.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

const deletecart = asyncHandler(async (req, res) => {
  const orders = await order.findOne({ "cart._id": req.params.id });

  if (!orders) {
    res.status(404);
    throw new Error("Order not found");
  }

  orders.cart = orders.cart.filter(
    (item) => item._id.toString() !== req.params.id
  );
  await orders.save();

  res.status(200).json({ message: "Cart deleted successfully" });
  if (orders.cart.length === 0) {
    const idd = orders._id;
    await order.findByIdAndDelete(idd);
    return res.status(200).json({ message: "Order deleted successfully" });
  }
});

module.exports = {
  getAllOrder,
  getOrder,
  setOrder,
  updateOrder,
  deleteOrder,
  deletecart,
};