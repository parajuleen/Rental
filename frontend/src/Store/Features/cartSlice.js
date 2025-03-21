import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItems:[]
}


const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addProduct:(state,actions)=>{
            const item=actions.payload
            const checkItem= state.cartItems.find((i)=>i.id===item.id)
            if(checkItem){
                checkItem.quantity=item.quantity
            }
            else{
                state.cartItems.push(item)
            }
            

        },
        removeProduct:(state,actions)=>{
            const id=actions.payload
            const data=state.cartItems.filter((i)=>i.id != id)
            state.cartItems=data

        },
        updateCart:(state,actions)=>{
            const{id,qty}=actions.payload
            const item=state.cartItems.find((i)=>i.id===id)
            if(item){
                item.quantity=qty
            }
            




        },

        clearCart:(state)=>{
            state.cartItems=[]
        }
    }
})

export const{addProduct,removeProduct,updateCart}= cartSlice.actions
export default cartSlice.reducer
