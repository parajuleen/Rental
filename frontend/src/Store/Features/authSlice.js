import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const signUp = createAsyncThunk('auth/signup',async(data)=>{
    try {
        const response= await axios.post("http://localhost:3535/api/users/register",data)
        return response.data

    } catch (error) {
        console.log(error.message)
        
    }
})

export const login=createAsyncThunk('auth/login' ,async(data,{rejectWithValue})=>{
    try {

        const response=await axios.post("http://localhost:3535/api/users/login",data,{
            withCredentials:true
        })
        return response.data        
    } catch (error) {
        if(error.response){
            return rejectWithValue(error.response.data)
        }
      
        
    }
})



const initialState={
    user:null,
    loading:false,
    error:null,
    isSuccess:false,
    isAuthenticated:false,
    
}


 const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logOutuser:(state)=>{
            state.isAuthenticated=false
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signUp.pending,(state,action)=>{
            state.loading=true

        })
        .addCase(signUp.fulfilled,(state,actions)=>{
            state.user=actions.payload.user
            state.loading=false
            state.isSuccess=true

        })
        .addCase(signUp.rejected,(state,actions)=>{
            state.error=actions.error.message
        })
        .addCase(login.pending,(state,actions)=>{
            state.loading=true 
        })
        .addCase(login.fulfilled,(state,actions)=>{
            state.user=actions.payload
            state.loading=false
            state.isAuthenticated=true
            state.isSuccess=true
        })
        .addCase(login.rejected,(state,actions)=>{
            console.log(actions.payload.message)
                state.error=actions.payload.message

        }) 
    }
})

export const {logOutuser}=authSlice.actions

export default authSlice.reducer