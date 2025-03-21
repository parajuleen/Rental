import {React} from "react";
import { removeProduct,updateCart } from "../Store/Features/cartSlice";
import { Plus, Minus, Trash, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
// import {loadStripe} from '@stripe/stripe-js'
// import axios from "axios";
// const key=import.meta.env.VITE_Stripe_API_Key


const Cart = () => {
    const {cartItems}=useSelector(state=>state.cart)
    const dispatch=useDispatch()
  

    const removeItem=(id)=>{
        dispatch(removeProduct(id))
    }

   const updateCartItems=(id,qty)=>{
    dispatch(updateCart({id,qty}))

   }



  return (
    cartItems.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-screen">
        <ShoppingCart className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add some items !</p>
      </div>
    ) : (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            {cartItems?.map((product) => (
              <div
                key={product.id}
                className="bg-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-24 h-24 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-grow flex  flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Unit Cost: <span className="font-medium text-gray-800">${product.price}/day</span>
                    </p>
                    
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                      onClick={()=>{
                        updateCartItems(product.id,product.quantity-1)
                      }}
                        disabled={product.quantity <= 1}
                        className={`p-1.5 rounded-full transition-colors duration-200 ${
                          product.quantity <= 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                        
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{product.quantity}</span>
                      
                      <button
                      onClick={()=>{
                        updateCartItems(product.id,product.quantity+1)
                      }}
                        disabled={product.quantity === product.availableQuantity}
                        className={`p-1.5 rounded-full transition-colors duration-200 ${
                          product.quantity === product.availableQuantity
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                        
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-lg font-semibold text-gray-800 w-24 text-right">
                      ${(product.price * product.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-80">
            <div className="bg-gray-300 rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex  justify-between text-gray-600">
                  <span>Items ({cartItems.length})</span>
                  {/* <span>${totalAmount.toFixed(2)}</span> */}
                </div>
                 
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    {/* <span>${totalAmount.toFixed(2)}</span> */}
                  </div>
                </div>
              </div>

              <button className="w-full flex  flex-col items-center mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            //   onClick={checkOutCart}
              >
                    Proceed to Checkout
              
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;