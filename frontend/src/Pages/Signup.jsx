import React, { useEffect } from "react";
import {useForm} from 'react-hook-form'
import { signUp,resetSignuperror } from "../Store/Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {Slide, toast} from 'react-toastify'



const Signup = () => {
    const dispatch=useDispatch()
    const {success,error}=useSelector(state=>state.auth.signupData)
    const navigate=useNavigate()

   const{register,handleSubmit,reset,formState:{
    errors
   }}= useForm()

   const onFormSubmit=(data)=>{
   dispatch(signUp(data))
   }

   useEffect(()=>{

    let timeout
    if(success){
      toast.success("Signup Success.Please login",{
        theme:"colored",
        autoClose:3000,
        position:"top-right",
        transition:Slide
      })   
      timeout=setTimeout(()=>{
        navigate('/login')

      },4000)
    }
    if(error){
      toast.error(error,{
        theme:"colored",
        autoClose:3000,
        position:"top-right",
        transition:Slide
      })
      timeout=setTimeout(()=>{
        dispatch(resetSignuperror())
      },4000)

    }
    return ()=>clearTimeout(timeout)

   },[error,success])

  
   

  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen relative">
        <div className="bg-gray-300 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>
          <form  onSubmit={handleSubmit(onFormSubmit)}>
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                    {...register("name",{required:"Name is required"})}
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
                <p className="text-red-700 text-center">{errors.name?.message}</p>
              </div>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                  {...register("email",{required:"Email is required",pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  }})}
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                 <p className="text-red-700 text-center">{errors.email?.message}</p>

                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    {...register("password",{
                        required:"Password is required"
                    })}
                    type="password"
                    id="password"
                    name="password"
                   
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                <p className="text-red-700 text-center">{errors.password?.message}</p>

                </div>
                {/* <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700">
                    Phone
                  </label>
                  <input
                  {...register("phone",{
                    required:"Phone is required",
                  })}
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{7}"
                    placeholder="980-1932922"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  />
                                   <p className="text-red-700 text-center">{errors.phone?.message}</p>

                </div>   */}
            </div>
            <div className="flex items-center justify-between">
                  <button
                  type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
                  </button>
                </div>
          </form>   
        </div>
      </div>
    </>
  );
};

export default Signup;
