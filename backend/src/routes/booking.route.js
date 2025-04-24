const express=require('express')
const router =express.Router()
const authUser=require('../middlewares/authware')
const { bookingDetails } = require('../controllers/booking.controller')

router.route('/getBookingdetails').get(authUser,bookingDetails)



module.exports=router