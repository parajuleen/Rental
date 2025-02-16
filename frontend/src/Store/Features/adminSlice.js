import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const createAdmin= createAsyncThunk('admin/create',async(data)=>{
    try {
        const response= await axios.post('http://localhost:3535/api/users/createadmin',data,{
            withCredentials:true
        })
        return response.data;
        
    } catch (error) {
        console.log('Error occured in creating admin',error)
    }
})

export const getAdmins=createAsyncThunk('admin/getadmins',async()=>{
    try {
        const response= await axios.get('http://localhost:3535/api/users/getadmins',{
            withCredentials:true
        })
        return response.data;
        
    } catch (error) {
        console.log(error)
        
    }

})

const initialState={
    data:null,
    isSuccess:false,
    isLoading:false,
    isError:false,
}



const adminSlice= createSlice({
    name:'admin',
    initialState,

    extraReducers:(builder)=>{
        builder
        .addCase(createAdmin.pending,(state,actions)=>{
            state.isLoading=true

        })
        .addCase(createAdmin.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.isSuccess=true
            state.data={
                ...state.data,
                admins:[...(state.data?.admins ||[]),actions.payload.newuser]
            }

        })
        .addCase(createAdmin.rejected,(state,actions)=>{
            state.isLoading=false
            state.isError=true
            
        })
        .addCase(getAdmins.pending,(state,actions)=>{
            state.isLoading=true
            })
            .addCase(getAdmins.fulfilled,(state,actions)=>{
                state.isLoading=false
                state.isSuccess=true
                state.data=actions.payload
            })
            .addCase(getAdmins.rejected,(state,actions)=>{
                state.isLoading=false
                state.isError=true
            })
    }
})


export const {addAdmin}=adminSlice.actions
export default adminSlice.reducer