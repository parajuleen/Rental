const express=require('express')
const router =express.Router()
const {authUser} =require('../middlewares/authware')
const { bookItem } = require('../controllers/booking.controller')

// router.route('/bookItem').post(authUser,bookItem)
router.route('/bookItem').post(bookItem)




module.exports=router