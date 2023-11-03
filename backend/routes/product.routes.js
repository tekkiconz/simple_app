var express = require("express");
const { productById } = require("../data/products");

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  try {
    return res.status(200).json(Object.values(productById));
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

productRouter.post("/", (req, res) => {
  try {
    const { body } = req;
    const errors = [];

    // Payload validation
    if (typeof body !== "object") {
      errors.push("The body should be a valid JSON object");
    }
    if (typeof body.name !== "string") {
      errors.push("Product name should be a string");
    }
    if (typeof body.price !== "number") {
      errors.push("Product price should be a number");
    } else if (body.price < 0) {
      errors.push("Product price should be a positive number");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        messages: errors,
      });
    }

    let newProductId = Object.values(productById).length;

    while (productById[newProductId]) {
      newProductId += 1;
    }

    productById[newProductId] = {
      productId: newProductId,
      name: body.name,
      price: body.price,
    };

    res.status(200).json(productById[newProductId]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = productRouter;
