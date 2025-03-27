import React, { useState } from "react";
import {  NavLink,Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Home,Menu,X,LogOut,ShoppingCart   } from "lucide-react";
import {logOutuser} from '../Store/Features/authSlice'
import axios from "axios";
import { persistor } from "../Store/store";



const Navbar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
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
        persistor.purge()
        navigate('/login')
        
      }      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <>
      <nav className="bg-gray-500 shadow-md sticky top-0 z-50 px-6 py-2 md:h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className=" flex  items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-white">RentEase</span>
            </Link>
            
          </div>
          <div>
          {
              openMenu ? <X onClick={handleMenu} size={32} className="md:hidden text-white " /> : <Menu  onClick={handleMenu}  className="md:hidden text-white" size={32}/>
            }
          </div>
          <div className=' hidden md:flex md:items-center md:justify-center '>
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
              <>
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

              <NavLink to="/cart"
              className={({ isActive }) => {
                return ` p-2
               text-sm lg:text-2xl mx-3 font-bold ${
                 isActive ? "text-blue-300" : "text-white"
               }`;
              }}
              >
              Cart
              
              </NavLink>



              </>
              
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
        {
          openMenu && <div className='flex flex-col  '>
          <NavLink
          onClick={()=>{
            setOpenMenu(false)
          }}
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
          <>
           <NavLink
            onClick={()=>{
              setOpenMenu(false)
            }}
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
          
            <NavLink
              to="/create"
              onClick={()=>{
                setOpenMenu(false)
              }}
              className={({ isActive }) => {
                return ` p-2
               text-sm lg:text-2xl mx-3 font-bold ${
                 isActive ? "text-blue-300" : "text-white"
               }`;
              }}
            >
              Add Posts
            </NavLink>
          </>)}
           {isAuthenticated && 
            <NavLink
              to="/profile"
              onClick={()=>{
                setOpenMenu(false)
              }}
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
          {user?.role == "user" && isAuthenticated && 
           <NavLink
           to="/cart"
           onClick={()=>{
            setOpenMenu(false)
          }}
           className={({ isActive }) => {
             return ` p-2 text-sm
              lg:text-2xl mx-3 font-bold ${
                isActive ? "text-blue-300" : "text-white"
              }`;
           }}
         >
           Cart
         </NavLink>
        
             
          }

    {!isAuthenticated &&  <NavLink
            to="/signup"
            onClick={()=>{
              setOpenMenu(false)
            }}
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
              onClick={()=>{
                setOpenMenu(false)
              }}
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
            <button className="  mx-2 text-white hover:bg-blue-300 w-12 flex justify-center items-center rounded-full"
              onClick={handleLogout}
            >
              <LogOut size={24}/>
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={()=>{
                setOpenMenu(false)
              }}
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
        }
        
      </nav>
    </>
  );
};

export default Navbar;
