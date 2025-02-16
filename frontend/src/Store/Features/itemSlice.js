import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


 export const createPost= createAsyncThunk('item/create',async(data)=>{
    try {
        const response= await axios.post('http://localhost:3535/api/items/listItem',data,{
            withCredentials:true
        })

        console.log(response.data.item)
        return response.data.item

    } catch (error) {
        console.log(error)
        
    }

 })

 export const rejectPosts=createAsyncThunk('item/rejected',async(id)=>{
    try {

        const response= await axios.put(`http://localhost:3535/api/items/rejectItem/${id}`,{},{
            withCredentials:true
        })

        return response.data.item

        
    } catch (error) {
        console.log(error)
        
 }})


 export const approvePosts=createAsyncThunk('item/approve',async(id)=>{
    try {

        const response= await axios.put(`http://localhost:3535/api/items/approveItem/${id}`,{},{
            withCredentials:true
        })

        return response.data.item


        
    } catch (error) {
        console.log(error)
        
    }
})


export const getApprovedposts=createAsyncThunk('item/getApproved',async(category,{rejectWithValue})=>{
    try {
        const response= await axios.get(`http://localhost:3535/api/items/getApproved${category ? `?category=${category}` :'' }`,{
            withCredentials:true
        })
    return response.data.products
        
    } catch (error) {
        if(error.response.data){
            return rejectWithValue(error.response.data)
        }       

    }
})


export const fetchPosts=createAsyncThunk('item/fetch',async(status,{rejectWithValue})=>{
    try {
        const response=await axios.get(`http://localhost:3535/api/items/fetchItem/${status}`,{
            withCredentials:true
        })
            return response.data.items

        
    } catch (error) {
        if(error.response.data){
            return rejectWithValue(error.response.data)
        }
    }
})








const initialState={
    data:null,
    isLoading:false,
    error:null
}



const itemSlice=createSlice({
    name:"item",
    initialState,
    reducers:{
        resetError:(state)=>{
            state.error=null
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(createPost.pending,(state,action)=>{
            state.isLoading=true

        })
        .addCase(createPost.fulfilled,(state,actions)=>{
            state.isLoading=false

        })
        .addCase(createPost.rejected,(state,actions)=>{
            state.isLoading=false
            state.error=actions.error.message
        })


        .addCase(fetchPosts.pending,(state,action)=>{
            state.isLoading=true
         })
        .addCase(fetchPosts.fulfilled,(state,actions)=>{
                state.isLoading=false
                state.data=actions.payload
        })
        .addCase(fetchPosts.rejected,(state,actions)=>{
                state.isLoading=false
                state.data=null
                state.error=actions.payload
        })


        .addCase(approvePosts.pending,(state,actions)=>{
            state.isLoading=true
        })
        .addCase(approvePosts.fulfilled,(state,actions)=>{

            state.isLoading=false
            state.data=state.data.filter((data)=>data._id !==actions.payload._id)
        })
        .addCase(approvePosts.rejected,(state,actions)=>{
            state.isLoading=false
            state.error=actions.error.message
        })
        .addCase(rejectPosts.pending,(state,actions)=>{
            state.isLoading=true
        })
        .addCase(rejectPosts.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.data=state.data.filter((data)=>data._id !==actions.payload._id)

        })
        .addCase(rejectPosts.rejected,(state,actions)=>{
            state.isLoading=false
            state.error=actions.error.message
        })
        .addCase(getApprovedposts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getApprovedposts.fulfilled,(state,actions)=>{
            state.isLoading=false
            state.data=actions.payload   
        })
        .addCase(getApprovedposts.rejected,(state,actions)=>{
            state.isLoading=false
            state.error=actions.payload.message
        })
    }
})

export const {resetError}=itemSlice.actions
export default itemSlice.reducer