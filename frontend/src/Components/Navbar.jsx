import React, { useState } from "react";
import {  NavLink,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home,Menu,X,LogOut,ShoppingCart   } from "lucide-react";
import {logOutuser} from '../Store/Features/authSlice'
import axios from "axios";



const Navbar = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector((state) => state.auth);
  const{cartItems}=useSelector((state)=>state.cart)

  const [openMenu,setOpenMenu]=useState(false)

  const handleMenu=()=>{
    setOpenMenu(!openMenu)
  }

  const handleLogout=async()=>{
    try {
      const response= await axios.post("http://localhost:3535/api/users/logout",{},{
        withCredentials:true
      })
      if(response.status === 200){
        dispatch(logOutuser())
      }      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <>
      <nav className="bg-gray-500 shadow-md sticky top-0 z-50 px-6 py-2 md:h-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
          <div className=" flex justify-between items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-white">RentEase</span>
            </Link>
            {
              openMenu ? <X onClick={handleMenu} className="md:hidden"/> : <Menu onClick={handleMenu} className="md:hidden"/>
            }
         
          </div>

          <div className={` flex ${openMenu ? "flex-col":"hidden md:flex md:flex-row "} `}>
            <NavLink
              to="/home"
              className={({ isActive }) => {
                return `text-sm  lg:text-2xl mx-3 p-2 font-bold ${
                  isActive ? "text-blue-300" : "text-white"
                }`;
              }}
            >
              Home
            </NavLink>
            {user?.role == "user" && isAuthenticated && (
              <NavLink
                to="/posts"
                className={({ isActive }) => {
                  return `
                   p-2
                   text-sm lg:text-2xl mx-3 font-bold ${
                     isActive ? "text-blue-300" : "text-white"
                   }`;
                }}
              >
                Get Posts
              </NavLink>
            )}
            {user?.role == "user" && isAuthenticated && (
              <NavLink
                to="/create"
                className={({ isActive }) => {
                  return ` p-2
                 text-sm lg:text-2xl mx-3 font-bold ${
                   isActive ? "text-blue-300" : "text-white"
                 }`;
                }}
              >
                Add Posts
              </NavLink>
            )}
             {isAuthenticated && 
              <NavLink
                to="/profile"
                className={({ isActive }) => {
                  return `
                  p-2
                   text-sm lg:text-2xl mx-3 font-bold ${
                     isActive ? "text-blue-300" : "text-white"
                   }`;
                }}
              >
                Profile
              </NavLink>
            }
            {isAuthenticated && 
                <div className="bg-white flex flex-col justify-center items-center relative max-w-8 md:max-w-12 rounded-full mx-3 my-1 px-1 ">
                <NavLink to="/cart">
                <ShoppingCart className="h-8 w-8 "/>
                </NavLink>
                
                <span className=" bg-red-500  text-white rounded-full flex justify-center items-center  h-5 w-5 p-2 absolute top-0 left-6 md:left-7 ">{cartItems.length}</span>

                </div>
            }

      {!isAuthenticated &&  <NavLink
              to="/signup"
              className={({ isActive }) => {
                return ` p-2 text-sm
                 lg:text-2xl mx-3 font-bold ${
                   isActive ? "text-blue-300" : "text-white"
                 }`;
              }}
            >
              SignUp
            </NavLink>}

           

           
            {(user?.role == "admin" || user?.role === "superadmin"  ) && isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                  return `
                   p-2
                   text-sm lg:text-2xl mx-3 font-bold ${
                    isActive ? "text-blue-300" : "text-white"
                   }`;
                }}
              >
                Dashboard
              </NavLink>
            )}

            {isAuthenticated ? (
              <button className="  mx-2 text-red-700  hover:bg-blue-300 w-12 flex justify-center items-center rounded-full"
                onClick={handleLogout}
              >
                <LogOut size={24}/>
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return `
                p-2
                 text-sm lg:text-2xl mx-3 font-bold ${
                   isActive ? "text-blue-300" : "text-white"
                 }`;
                }}
              >
                Login
              </NavLink>
            )}
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
