const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservations = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone_nb: {
      type: Number,
      required: true,
    },

    email:{
       type: String,
    },

    date: {
      type: String,
      //required:[true, 'Please add a product Description'],
    },

    address: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    tools: [
        {
          type: String, // Update the type to match the desired type of items in the array
        }
      ]
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("reservations", reservations);
