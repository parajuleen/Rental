import React, { useEffect, useState } from 'react'
import { Users,Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { listAlluser } from '../Store/Features/userSlice';
import Pagination from './Pagination';

const UserLists = () => {

  const disptach=useDispatch()

  const {isLoading,userList}= useSelector(state=>state.user)

const totalItems=userList?.length
const itemsPerpage=10
const[currentPage,setCurrentPage]=useState(1)

 

  const lastIndex= currentPage*itemsPerpage
  const firstIndex=lastIndex-itemsPerpage

  const slicedUser=userList?.slice(firstIndex,lastIndex)

  const handlePage=(page)=>{
    setCurrentPage(page)
  }

const[query,setQuery]=useState('')

const searchedData= query.trim() ? slicedUser.filter((data)=>{
  return(
    data.name.toLowerCase().includes(query.toLowerCase()) ||
    data.email.toLowerCase().includes(query.toLowerCase()) 
  )
}):slicedUser




useEffect(()=>{
  disptach(listAlluser())

},[])


  return (
    <div className='w-full flex justify-center  flex-col  items-center p-4'>

    { isLoading && <div>
    <svg aria-hidden="true" class="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>}



  <div className="bg-gray-200 rounded-xl shadow-lg p-6 md:w-3/4 min-h-[700px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Users List
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder=" Enter name or email..."
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e)=>{
                  setQuery(e.target.value)
                }}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b-2 border-gray-100">
                <th className="sm:px-4 sm:py-3 text-center text-sm font-semibold text-gray-900">S.N</th>
                  <th className="sm:px-4 sm:py-3 text-center text-sm font-semibold text-gray-900">Name</th>
                  <th className="sm:px-4 sm:py-3 text-center text-sm font-semibold text-gray-900">Email</th>
                  <th className="sm:px-4 sm:py-3 text-center text-sm font-semibold text-gray-900">Phone</th>
                  <th className="sm:px-4 sm:py-3 text-center text-sm font-semibold text-gray-900">Address</th>
                </tr>
              </thead>
              <tbody>
                {userList && searchedData.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 ">
                     <td className=" p-2 sm:px-4 sm:py-3 text-center font-semibold">
                      {userList.indexOf(user)+1}
                    </td>
                    <td className=" p-2 sm:px-4 sm:py-3 text-center font-semibold">
                    {user.name}
                    </td>
                    <td className=" p-2 sm:px-4 sm:py-3 text-center font-semibold">
                    {user.email}
                    </td>
                    <td className="p-2 sm:px-4 sm:py-3 text-center font-semibold">
                    {user.phone}
                    </td>
                    <td className=" p-2 sm:px-4 sm:py-3 text-center font-semibold">
                    {user.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     </div>

      <Pagination totalItems={totalItems} itemsPerpage={itemsPerpage} handlePage={handlePage} currentPage={currentPage}/>
    </div>
  )
}

export default UserLists
