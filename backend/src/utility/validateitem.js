const {Item} =require('../models/item.model')
const validateItem=async (items)=>{

    const validatedProducts=[]
    for (const item of items) {
        const productDetails= await Item.findOne({
            itemname:item.itemname
        })
        if(!productDetails || productDetails.quantity < item.quantity){
            return "stock unavailable"
        }

    }
}

module.exports=validateItem