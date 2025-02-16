import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser=createAsyncThunk('user/getUser',async()=>{
    try {
        const response= await axios.get('http://localhost:3535/api/users/getuserinfo',{
            withCredentials:true
        })
        return response.data.user

        
    } catch (error) {
        console.log(error)
        
    }

})

export const updateProfile=createAsyncThunk('user/update',async(data)=>{
    try {
        const response=await axios.post('http://localhost:3535/api/users/editProfile',data,{
            withCredentials:true
        })

        return response
    } catch (error) {
        console.log('Error in updating user profile',error)
        
    }
})


export const listAlluser=createAsyncThunk('user/getall',async()=>{
    try {
        const response=await axios.get('http://localhost:3535/api/users/getAlluser',{
            withCredentials:true
        })
        return response.data.users
        
    } catch (error) {
        console.log("error on getting all users",error)
        
    }
})

const initialState={
    data:null,
    userList:null,
    isloading:false,
    error:null,
    status:null
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending,(state,actions)=>{
            state.isloading=true

        })
        .addCase(getUser.fulfilled,(state,actions)=>{
            state.isloading=false
            state.data=actions.payload
            state.status=null
            

        })
        .addCase(getUser.rejected,(state,actions)=>{
            state.isloading=false
            state.error=actions.error.message
        })
        .addCase(updateProfile.pending,(state,actions)=>{
            state.isloading=true
        })
        .addCase(updateProfile.fulfilled,(state,actions)=>{
            state.isloading=false
            state.data=actions.payload.data
            state.status=actions.payload.status

        })
        .addCase(updateProfile.rejected,(state,actions)=>{
            state.isloading=false
            state.error=actions.error.message
        })
        .addCase(listAlluser.pending,(state,actions)=>{
            state.isloading=true
        })
        .addCase(listAlluser.fulfilled,(state,actions)=>{
            state.isloading=false
            state.userList=actions.payload

        })
        .addCase(listAlluser.rejected,(state,actions)=>{
            state.isloading=false
            state.error=actions.error.message
        })

    }
})


export default userSlice.reducer