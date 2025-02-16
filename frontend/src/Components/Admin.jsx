import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createAdmin ,getAdmins} from '../Store/Features/adminSlice'
import { 
  Users, 
  UserPlus, 
  Mail, 
  Lock, 
  UserCog,
  Search,
  MoreVertical,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Admin = () => {

   const {register,handleSubmit,reset,formState:{errors
   }
   } =useForm()

   const dispatch=useDispatch()

 const admin= useSelector(state=>state.admin.data?.admins)
 
 
  const registerAdmin=(data)=>{
    dispatch(createAdmin(data))
    reset()
  }

  useEffect(()=>{
    dispatch(getAdmins())
  },[])


  return (
   <>
  
   <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="container mx-auto space-y-4 md:space-y-0 md:flex md:gap-6 ">
        <div className="bg-gray-200 rounded-xl shadow-lg p-6 md:w-1/2 min-h-screen">
          <div className="flex items-center justify-between mb-6 ">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Admin List
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search admins..."
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {admin && admin.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                    {admin.name}
                    </td>
                    <td className="px-4 py-3">
                    {admin.email}
                    </td>
                    <td className="px-4 py-3">
                      {admin.status === 'active' ? (
                        <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-100 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700">
                          <XCircle className="w-4 h-4" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:w-1/2 ">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 justify-center">
            <UserPlus className="w-5 h-5  text-gray-800" />
            Create Admin
          </h2>
          
          <form className="space-y-4" onSubmit={handleSubmit(registerAdmin)}>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="name">
                <span className="flex items-center gap-2">
                  <UserCog className="w-6 h-6 text-blue-300" />
                  Name
                </span>
              </label>
              <input
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters long',
                  }
                })}
                type="text"
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter name"
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <span className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-300" />
                  Email
                </span>
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                })}
                type="email"
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <span className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-blue-300" />
                  Password
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <span className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-300" />
                  Role
                </span>
              </label>
              <select
                {...register('role', {
                  required: 'Select the role of user',
                })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a role</option>
                <option value="superadmin">Super-Admin</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role?.message && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
   </>
  )
}

export default Admin
