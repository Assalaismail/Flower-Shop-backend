const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
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
          quantity:{ 
            type: Number, 
            required: true ,
            default: 1,
          },
          price_after_discount: { 
            type: Number, 
            required: true
          },
          total_price:{
            type: Number
          }
         
        },
      ],
    
    total: { type: Number, default: 0.0 },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("Cart", Cart);
