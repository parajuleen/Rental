const mongoose=require('mongoose')

const bookingSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items:[
        {
            itemId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Items"
            },
            startDate:{
                type:Date,
                required:true,
            },
            endDate:{
                type:Date,
                required:true,
            },
            quantity:{
                type:Number,
            },
            totalamount:{
                type:Number,
            },


        }
    ],
    status:{
        type:String,
        default:'pending',

    }
},
{
    timestamps:true
})




const Booking= mongoose.model('Booking',bookingSchema)

module.exports={
    Booking
}