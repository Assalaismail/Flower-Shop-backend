const express = require('express')
const router = express.Router()

const { registerUser,loginUser,getUsers,getUser} = require('../controllers/user')
const {protect} = require('../middleware/authMiddleware')

    
router.get('/get', getUsers)
// router.get('/user', getUser)
router.post('/signup', registerUser)
router.post('/login', loginUser)

//this following protect is actually a protection for a specific route, lets say you have a route that you want to check if the user is logged in or not, you can simply add the protect function as a secont argument before the actuall function

//like this example below
//u can use it in the getusers function above

module.exports = router