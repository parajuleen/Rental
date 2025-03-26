import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const signUp = createAsyncThunk('auth/signup',async(data,{rejectWithValue})=>{
    try {
        const response= await axios.post("http://localhost:3535/api/users/register",data)
        return response.data

    } catch (error) {
        if(error.response){
            return rejectWithValue(error.response.data)
        }
        else{
            return rejectWithValue(error.message)
        }
        
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
        else{
            return rejectWithValue(error.message)
        }
        
        
    }
})



const initialState={
    user:null,
    loading:false,
    error:null,
    isSuccess:false,
    isAuthenticated:false,
    signupData:{
        loading:false,
        success:false,
        error:null

    }
    
}


 const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logOutuser:(state)=>{
            state.isAuthenticated=false
            state.error=null
        },
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signUp.pending,(state,action)=>{
            state.signupData.loading=true

        })
        .addCase(signUp.fulfilled,(state)=>{
            state.signupData.loading=false
            state.signupData.success=true

        })
        .addCase(signUp.rejected,(state,actions)=>{
            state.signupData.loading=false
            state.signupData.success=false
            state.signupData.error=actions.payload.message || actions.payload
        })
        .addCase(login.pending,(state)=>{
            state.loading=true 
            state.isAuthenticated=false
        })
        .addCase(login.fulfilled,(state,actions)=>{
            state.user=actions.payload
            state.loading=false
            state.isAuthenticated=true
            state.isSuccess=true
        })
        .addCase(login.rejected,(state,actions)=>{
            state.loading=false
            state.isAuthenticated=false
            state.isSuccess=false
            state.error= actions.payload.message || actions.payload

        }) 
    }
})

export const {logOutuser}=authSlice.actions

export default authSlice.reducer