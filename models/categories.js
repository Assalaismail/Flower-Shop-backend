const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const categories= new mongoose.Schema({
   name_category:{
            type:String,
            // required:[true, 'Please add a category Name'],
        },

      //   image_category: {
      //     public_id:{
      //        type: String,
            
      //     },
      //     url:{
      //        type: String,
       
      //     }
      //   },
  },
{
timestamps: true,
}
)
module.exports = mongoose.model("categories", categories);