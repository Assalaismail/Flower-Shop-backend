const express = require('express');
const router = express.Router();
const upload= require('../middleware/upload')
const { protect } = require("../middleware/authMiddleware");



const { getcategories, getcategorybyid,
    postcategory,
    deletecategory,
    updatecategory}=require("../controllers/categories");

router.get("/getcategory",getcategories)
router.get("/getcategory/:id",getcategorybyid )

router.post("/addcategory",protect,  postcategory)
router.delete("/delcategory/:id",protect, deletecategory)
router.put("/updcategory/:id", protect,updatecategory)


module.exports=router;

