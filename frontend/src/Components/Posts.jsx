import React, { useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import { fetchPosts,approvePosts,rejectPosts } from '../Store/Features/itemSlice'
import { useDispatch ,useSelector} from 'react-redux'
import {Check,X} from 'lucide-react'




const Posts = () => {

    const {status}=useParams()
    const dispatch = useDispatch()

    const {data,error}=useSelector(state=>state.item)
    
    const handlePosts=(id,actiontype)=>
        {
          if(actiontype === 'approve'){
            dispatch(approvePosts(id))
          }
          else if(actiontype === 'reject'){
            dispatch(rejectPosts(id))
          }
      
        }



    useEffect(()=>{
        dispatch(fetchPosts(status))

    },[status])

  return (
    <>
    {
      data?.length ?  <div className="container mx-auto px-4 py-8 bg-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {data && data?.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 "
          >
            <div className="h-48">
              <img
                src={item.productImages[0]}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold h-12 flex items-center justify-center">
                {item.itemName}
              </h2>

              <p className="text-gray-600 mt-1 h-16 overflow-hidden text-ellipsis">
                {item.description}
              </p>

            
              <p className="text-xl font-bold mt-2 text-blue-600 h-8">
                ${item.unitPrice}/day
              </p>
            </div>

            <div className="flex justify-between text-sm text-gray-500 px-4 py-2 border-t">
              <span className="h-6 flex items-center">{item.category}</span>
              <span className="h-6 flex items-center">Qty: {item.availableQuantity}</span>
            </div>

                {
                    status == 'pending' ? 
                     <div className="flex">
                        <button
                          className="w-1/2 bg-blue-500 hover:bg-green-600 text-white py-2 text-md px-4 flex items-center justify-center gap-2 transition-colors duration-300"
                          onClick={()=>{
                            handlePosts(item._id,'approve')
                          }}
                        >
                          <span>Approve</span>
                        </button>
          
                        <button
                          className="w-1/2 bg-gray-500 hover:bg-red-600 text-white py-2 text-md px-4 flex items-center justify-center gap-2 transition-colors duration-300"
                          onClick={()=>{
                            handlePosts(item._id,'reject')
                          }}
                        >
                          <X size={20} />
                          <span>Reject</span>
                        </button>
                      </div> : null

                }
            
          </div>
        ))}
      </div>
    </div>:(
      <>
      <div className="flex  h-screen">
       {error && <h1 className="text-3xl font-bold text-blue-600">{error.message}....</h1>}
      </div>
      </>

    )

    }
 
    </>
    
  )
}

export default Posts
