const express = require('express');
const router = express.Router();
const upload= require('../middleware/upload')

const {getitembyid,getitems,getdiscount,getItemsByCategory, getItemsByCategoryName, postitems,deleteitems, updateitems}=require("../controllers/items");

router.get("/getflower",getitems)
router.get("/getflower/:id", getitembyid);
router.get("/items/:category_id", getItemsByCategory );
router.get("/products/:categoryName", getItemsByCategoryName );
router.get("/getdiscountflower",getdiscount)



router.post("/addflower",upload.single('image'),postitems)
router.delete("/delflower/:id",deleteitems)
router.put("/updflower/:id",updateitems)


module.exports=router;

