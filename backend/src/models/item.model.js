const mongoose=require('mongoose')

const itemSchema= new mongoose.Schema(
    {
        itemName :{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true

        },
        category:{
            type:String,
            required:true,
        },
        productImages:{
            type:Array,
            required:true
            

        },
        unitPrice:{
            type:Number,
            required:true
        },
        availableQuantity:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            default:'pending',
        },

        availabilty:{
            type:Boolean,
            default:true,
        },
        ownedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
},
{
    timestamps:true
})

const Item= mongoose.model('Item',itemSchema)

module.exports={
    Item
}