import React from "react";
import {  NavLink,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "lucide-react";
import {logOutuser} from '../Store/Features/authSlice'
import axios from "axios";



const Navbar = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector((state) => state.auth);

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
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className=" flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-white">RentEase</span>
            </Link>
          </div>

          <div className=" hidden md:flex items-center space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) => {
                return ` text-2xl mx-3 p-2 font-bold ${
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
                   text-2xl mx-3 font-bold ${
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
                 text-2xl mx-3 font-bold ${
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
                   text-2xl mx-3 font-bold ${
                     isActive ? "text-blue-300" : "text-white"
                   }`;
                }}
              >
                Profile
              </NavLink>
            }
      {!isAuthenticated &&  <NavLink
              to="/signup"
              className={({ isActive }) => {
                return ` p-2
                 text-2xl mx-3 font-bold ${
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
                   text-2xl mx-3 font-bold ${
                    isActive ? "text-blue-300" : "text-white"
                   }`;
                }}
              >
                Dashboard
              </NavLink>
            )}

            {isAuthenticated ? (
              <button
                className="bg-red-500 hover:bg-red-400 text-white text-2xl font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return `
                p-2
                 text-2xl mx-3 font-bold ${
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
