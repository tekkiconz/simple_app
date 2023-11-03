var express = require("express");
const { productById } = require("../data/products");
const { orders } = require("../data/orders");

const orderRouter = express.Router();

orderRouter.post("/", (req, res) => {
  try {
    const { body } = req;

    const errors = [];
    // Payload validation
    if (typeof body !== "object") {
      errors.push("The body should be a valid JSON object");
    }
    if (!Array.isArray(body.orderItems)) {
      errors.push("Order items must be an array");
    }
    const isOrderItemInvalid = body.orderItems.some((item) => {
      if (typeof item !== "object") {
        return true;
      }
      if (!productById[item.productId]) {
        return true;
      }
      if (typeof item.quantity !== "number" || item.quantity < 0) {
        return true;
      }

      return false;
    });

    if (isOrderItemInvalid) {
      errors.push("Invalid order items payload");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        messages: errors,
      });
    }
    const newOrder = {
      orderId: orders.length,
      orderItems: body.orderItems,
    };

    orders.push(newOrder);

    const orderItemReponse = newOrder.orderItems.map(
      ({ productId, quantity }) => ({
        product: productById[productId],
        quantity,
        total: quantity * productById[productId].price,
      })
    );
    const responseData = {
      orderId: newOrder.orderId,
      orderItems: orderItemReponse,
      total: orderItemReponse.reduce((prev, { total }) => prev + total, 0),
    };

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = orderRouter;
