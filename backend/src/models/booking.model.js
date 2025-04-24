const mongoose=require('mongoose')

const bookingSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    paymentId:{
        type:String
    },
    sessionId:{
        type:String
    },
    items:[    
    ],
    totalAmount:{
        type:Number
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','success']
    }
},
{
    timestamps:true
})




const Booking= mongoose.model('Booking',bookingSchema)

module.exports={
    Booking
}