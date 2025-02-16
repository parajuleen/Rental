const {Booking}=require('../models/booking.model')
const {Item}=require('../models/item.model')
const validateItem = require('../utility/validateitem')

//In process of developing//

const bookItem=async(req,res)=>{
   //get the cart items
   //validate the cart items (prices and quantity)
   //create a new booking
   //save the booking to the database

   const {items}=req.body

 const validation=validateItem(items)
   res.status(200).json({
    validation
   })


}


module.exports={
    bookItem
}