const {Item}=require('../models/item.model')


//for other users
const listProduct=async(req,res)=>{

    const {itemName,description,availableQuantity,unitPrice,availability,category}=req.body

    const imgURL=req.images
    const {id}=req.user
    console.log(id)

    if( !(itemName || description || availability|| availableQuantity || unitPrice||category)){
        return res.status(400).json({message:'Please fill all the fields'})
    }

    const item =await Item.create({
        itemName,
        category,
        description,
        availableQuantity,
        unitPrice,
        availability,
        productImages:imgURL,
        ownedBy:id
    })

    if(!item){
        return res.status(400).json({message:'Failed to create item'})
    }

    res.status(200).json({
        message:"Product added successfully",
        item
    })

    
}

const getapprovedProducts=async(req,res)=>{

    try {
        const {category}=req.query
        
        if(category){
            const products=await Item.find({
                $and:[{status:'approved'},{category}]
            })
            if(!products.length){
                return res.status(404).json({message:'No items found'})
            }

            return res.status(200).json({products})
        }
        else{
            const products=await Item.find({status:'approved'})
            if(!products.length){
                return res.status(404).json({message:'No items found'})
            }
            return res.status(200).json({products})
    
        }
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
   

}




//For admin //
const approveItem=async(req,res)=>{
    try {

        const id=req.params.id


            const item=await Item.findByIdAndUpdate(id,
                {
                    status:"approved"
                },{
                    new:true
                }
                )

                if(!item){
                    return res.status(400).json({
                        send:"Item not found"
                    })
                }


                return res.status(200).json({
                    message:"Item approved",
                    item
                })
            
    } catch (error) {
        console.log(error)
        
    }

}

const rejectItem=async(req,res)=>{
    try {

        const id=req.params.id
      

            const item=await Item.findByIdAndUpdate(id,
                {
                    status:"rejected"
                },{
                    new:true
                }
                )

                if(!item){
                    return res.status(400).json({
                        send:"Item not found"
                    })
                }


                return res.status(200).json({
                    message:"Item rejected",
                    item
                })
            
    } catch (error) {
        console.log(error)
        
    }

}


const fetchProducts=async (req,res) => {
    try {
        const {status}= req.params

        const items= await Item.find({
            status
        })

        if (!items.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json({
            items
        })     


        
    } catch (error) {
        console.log(error)
    }

    
}


//To be updated//
//add products and diplay cart
//checkout out from cart

module.exports={
    listProduct,
    getapprovedProducts,
    approveItem,
    rejectItem,
    fetchProducts
    
}