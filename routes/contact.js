const express = require('express');
const router = express.Router();
// const { protect, isAdmin } = require("../middleware/authMiddleware");



const {getcontactus, postcontactus, contUs} = require("../controllers/contact");
router.route('/').get( getcontactus).post(postcontactus)
router.route("/:id").delete( contUs);
module.exports=router;
