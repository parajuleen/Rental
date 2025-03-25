const express=require('express')
const router=express.Router()
const createCheckout=require('../controllers/payment.controller')
const authUser=require('../middlewares/authware')

router.route('/createsession').post(authUser,createCheckout)

module.exports=router