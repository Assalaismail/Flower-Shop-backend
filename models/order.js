const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const items = require("../models/items.js");

const order = new Schema(
  {
    cart: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "items",
          required: [true, "Please include a productTable"],
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
       
      },
    ],
    payment_type: {
      type: String,
    },
    total_price: {
      type: Number,
    },
    phone_number: {
      type: Number,
      required:true,
    },
    address: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "order",
  }
);

module.exports = mongoose.model("order", order);