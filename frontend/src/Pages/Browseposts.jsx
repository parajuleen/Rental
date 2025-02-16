import React, { useEffect,useState } from 'react'
import { getApprovedposts,resetError } from '../Store/Features/itemSlice'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from'react-router-dom'
import { Filter,X } from 'lucide-react';

import { categories } from '../Utility/Categories'

const Browseposts = () => {
  const dispatch = useDispatch()

  const navigate=useNavigate()

  const [category, setCategory] = useState(null);

  const {data,error}=useSelector(state=>state.item)
  const {user}=useSelector(state=>state.auth)
  
  useEffect(()=>{
   dispatch(getApprovedposts(category))
   dispatch(resetError())
  },[category])



 


 

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
   <>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Rent Now</h1>
        <div className="relative flex items-center justify-center">
        <span className={`bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 flex items-center ${ category ? "" :"hidden"} dark:text-blue-300`}>{category}
          <X onClick={() => 
            setCategory(null)} className='hover:cursor-pointer' size={20}/>
        </span>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-5 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setCategory(category);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md  text-blue-600 hover:bg-blue-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
          {
            error ? <h1 className="text-3xl font-bold  text-center text-blue-800">{error}...</h1>:
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              
              data?.filter((item)=>item.ownedBy != user.id).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
                  <img
                    src={item.productImages[0]}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>
    
                <h3 className="text-xl font-semibold mb-1">{item.itemName}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
    
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-blue-600">
                    ${item.unitPrice} / day
                  </span>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
    
                <p className="text-sm text-gray-500 mb-3">
                  Available: {item.availableQuantity}
                </p>
               

  
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700 transition" onClick={()=>{
                  navigate(`/posts/${item._id}`)
                }}>
                  Rent Now
                </button>
              </div>
            ))}
          </div>

          }
    
    </div>

   </>
  )
}

export default Browseposts
