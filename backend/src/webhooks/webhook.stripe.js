const stripe=require("stripe")(process.env.Stripe_Secret_Key)
const endSecret=process.env.Stripe_End_Secret
const {Booking}=require('../models/booking.model')

const handleWebhook= async (req,res) => {
    const payload=req.body

    const signature=req.headers['stripe-signature']
    let event


    if(endSecret){
        try {
            event=stripe.webhooks.constructEvent(payload,signature,endSecret)   
            
        } catch (error) {
            console.log('Stripe verification error',error)  
        }
    }


    if(event.type === 'checkout.session.completed'){

         //store session id,userId and payment intent id db/booking schema and fetch the line items from session id//

       try {
         const session=event.data.object
         const{payment_intent,id ,metadata,amount_total}=session
 
 
         const lineItems= await stripe.checkout.sessions.listLineItems(id)
 
 
        const items=lineItems.data.map((item)=>({
         description:item.description,
         unitcost:item.price.unit_amount/100,
         quantity:item.quantity,
         total:item.amount_total/100
 
        }))
 
      const bookitem= await Booking.create({
             userId:metadata.userID,
             paymentId:payment_intent,
             sessionId:id,
             totalAmount:amount_total/100,
             items:items,
             status:"success"
         })
 
 
         if(!bookitem){
             return res.status(400).json({
                 message:"Failed to book item"
             })
         }
       } catch (error) {
        console.log("webhook error",error)
        return res.status(500).json({
            message:"Internal server error"
        })
        
       }

  
    }
    
}

module.exports={
    handleWebhook
}