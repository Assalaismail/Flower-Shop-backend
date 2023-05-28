const express = require("express");
const router = express.Router();
const { getOrder } = require("../controllers/order");
const { getAllOrder } = require("../controllers/order");
const { setOrder } = require("../controllers/order");
const { updateOrder } = require("../controllers/order");
const { deleteOrder } = require("../controllers/order");
const { deletecart } = require("../controllers/order")

router.get('/', getAllOrder);
router.post('/', setOrder);
router.get('/:id',getOrder )
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder); 
router.delete('/cart/:id', deletecart)

module.exports = router;