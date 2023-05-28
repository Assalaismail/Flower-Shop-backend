import express from "express";
const router = express.Router();

const {
  addToCart,
  removeFromCart,
  AllCarts,
  deleteAllCarts,
  Acart,
  deleteACart,
} = require("../controllers/cart.js");

router.post("/addtocart", addToCart);
router.post("/removefromcart", removeFromCart);
router.get("/allcarts", AllCarts);
router.delete("/deletecarts", deleteAllCarts);
router.get("/:id", Acart);
router.delete("/:id", deleteACart);

module.exports = router;
