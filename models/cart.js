const mongoose = require("mongoose");

const cart = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "items",
        },
        item_name: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price_after_discount: {
          type: Number,
          required: true,
        },
        total_price: {
          type: Number,
        },
      },
    ],

    total: { type: Number, default: 0.0 },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("cart", cart);
