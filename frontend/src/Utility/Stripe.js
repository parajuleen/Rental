import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripeKey=import.meta.env.VITE_Stripe_Key

const stripeCheckout=async(productData)=>{
   try {
     const {data}= await axios.post(`http://localhost:3535/api/payment/createsession`,productData,{
         withCredentials:true
     })
     const stripe= await loadStripe(stripeKey)
     
     const sessionID=data.id
 
     const result=await stripe.redirectToCheckout({
         sessionId: sessionID
     })
     if(result.error){
         console.log(result.error.message)
     }
   } catch (error) {
    console.log(error.message)
    
   }

}

export default stripeCheckout