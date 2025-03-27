import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { login ,resetLoginerror} from '../Store/Features/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Slide, toast} from 'react-toastify'

const Login = () => {

  const{register,handleSubmit}=useForm()

const {user,isSuccess,isAuthenticated,error}=useSelector(state=>state.auth)
  

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const submitLogin= (data)=>{
   dispatch(login(data))
    
  }

  useEffect(()=>{
    if(error){
      toast.error(error,{
        theme:"colored",
        position:'top-right',
        autoClose:2000,
        transition:Slide
      })
     }
     let timeout
     timeout=setTimeout(()=>{
      dispatch(resetLoginerror())

     },4000)
     return ()=>clearTimeout(timeout)
    
  },[error])


  useEffect(() => {
    if ( isSuccess && isAuthenticated) {
      if (user?.role === "admin" || user?.role === "superadmin"  ) {
        navigate("/dashboard");
      } else if (user?.role === "user") {
        navigate("/profile");
      }
    }
  }, [isAuthenticated, user, navigate])


  return (
    <>    
      <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg ">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Login
          </h2>          
          <form onSubmit={handleSubmit(submitLogin)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
              {...register("email")}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* <input
                  type="checkbox"
                  onClick={(e) => {
                    if (e.target.checked) {
                      setPassword("text");
                    } else {
                      setPassword("password");
                    }
                  }}
                />
                Show Password */}
            </div>
           

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
  
        </div>
      </div>
    
    
     
    </>
 
  )
}

export default Login
