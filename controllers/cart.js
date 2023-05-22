import Cart from "../models/cart.js";
import items from "../models/items.js";
import User from "../models/user.model.js"

//get
const AllCarts = async(req, res) =>{
  try{
    const carts = await Cart.find({}).exec();
    if(!carts){
      return res.status(404).json({message: "no carts"})
    }
    else{
      return res.status(200).json(carts)
    }
    
  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
}}

//add to cart
const addToCart = async (req, res) => {
  console.log(req.body);
  try {
    const { productId, productName, quantity } = req.body;
    const userId = req.body.userId;

    const cartProducts = Array.isArray(req.body.items) ? req.body.items : [{ productId, productName, quantity }];

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = new Cart({
        user_id: userId,
        items: [],
        total_price: 0,
      });
    }

    let totalPrice = cart.total_price;

    for (const cartProduct of cartProducts) {
      const { productId, productName, quantity } = cartProduct;

      const product = await items.findById(productId);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      // Don't affect the quantity of the item in the stock
      const existingProduct = cart.items.find((item) => item.product.toString() === productId);
      if (!existingProduct) {
        cart.items.push({ product: productId, name:productName, quantity, price_after_discount: product.price_after_discount, total_price: product.price_after_discount * quantity });
      } else {
        existingProduct.quantity += quantity;
        existingProduct.total_price += product.price_after_discount * quantity;
      }

      totalPrice += product.price_after_discount * quantity;
    }

    cart.total_price = totalPrice;
    await cart.save();

    res.status(201).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

 const Acart = async(req, res) =>{
  console.log(req.params.id)
  // const  id = "6437c07bd944ba122a2804a4" 
  const id = req.params.id
try{
    const cart = await Cart.find({user_id: id}).exec();
    if(!cart){
      return res.status(404).json({message:"no items in the cart"})
    
    }else{
      return res.status(200).json(cart)
    }
  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
}
}

  


//delete 
 const removeFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.body.userId;

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index !== -1) {
      const product = await items.findById(productId);
      const price = product.price_after_discount;
      const total_price = price * quantity;

      if (quantity > cart.items[index].quantity) {
        return res.status(400).json({ success: false, message: "Cannot remove more products than the quantity in the cart" });
      }

      cart.items[index].quantity -= quantity;
      cart.items[index].total_price -= total_price;

      if (cart.items[index].quantity === 0) {
        cart.items.splice(index, 1);
      }

      await cart.save();

      product.productQuantity += quantity;
      await product.save();

      if (cart.items.length === 0) {
        await Cart.findByIdAndDelete(cart._id);
      }
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const deleteAllCarts = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ success: true, message: "All carts deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


const deleteACart = async (req, res) =>{
  const id = req.params.id
  try { const cart = await Cart.find({user_id: id})
  if(!cart){
    return res.status(404).json("user dosent have a cart")
  }
  await Cart.deleteOne({user_id:id})
  return res.status(201).json(`cart ${id} is deleted`)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


module.exports = {
    AllCarts, 
    addToCart,
    Acart,
    removeFromCart,
    deleteAllCarts,
    deleteACart,
  }