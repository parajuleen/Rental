import {React,useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Users, UserCircle, LayoutGrid, Shield, ChevronDown } from 'lucide-react';

const Sidebar = () => {

  const {user}=useSelector((state)=>state.auth)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
   
    <div className="container bg-gray-800 md:rounded-lg hidden md:block md:w-1/4 lg:w-1/6">
  <nav className='flex flex-col p-4 space-y-3'>
    {user?.role === 'superadmin' && (
      <NavLink 
        to="admin"  
        className={({ isActive }) =>
          `p-3 rounded-xl transition-all duration-200 hover:bg-gray-700 font-semibold text-lg flex items-center gap-3 ${
            isActive 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
              : "bg-gray-700 text-gray-200 hover:text-white"
          }`
        }
      >
        <Shield className="w-5 h-5" />
        <span>Admin</span>
      </NavLink>
    )}
    
    <NavLink 
      to="users"  
      className={({ isActive }) =>
        `p-3 rounded-xl transition-all duration-200 hover:bg-gray-700 font-semibold text-lg flex items-center gap-3 ${
          isActive 
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
            : "bg-gray-700 text-gray-200 hover:text-white"
        }`
      }
    >
      <UserCircle className="w-5 h-5" />
      <span>Users</span>
    </NavLink>
    
   <div className="relative">
      <NavLink
        to="listings/approved"
        className={({ isActive }) =>
          `p-3 rounded-xl transition-all duration-200 hover:bg-green-300 font-semibold text-lg flex items-center gap-3 ${
            isActive
              ? "bg-green-600 text-white shadow-lg shadow-blue-500/20"
              : "bg-gray-700 text-gray-200 hover:text-white"
          }`
        }
        
      >
        <LayoutGrid className="w-5 h-5" />
        <span>Listings</span>
        <ChevronDown className="w-5 h-5 transition-transform "  onMouseEnter={() => setIsOpen(!isOpen)}/>
      </NavLink>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-gray-500 text-white rounded-lg shadow-lg overflow-hidden">
          <NavLink
            to="listings/pending"
            className={({isActive})=>{
              return(
                ` block px-4 py-2 hover:bg-blue-400 ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-700 text-gray-200 hover:text-white "}`
              )
            }}
          >
            Pending
          </NavLink>
          <NavLink
            to="listings/rejected"
            className={({isActive})=>{
              return(
                ` block px-4 py-2 hover:bg-red-600 ${isActive ? "bg-red-800  text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-700 text-gray-200 hover:text-white "}`
              )
            }}
          >
            Rejected
          </NavLink>
        
        </div>
      )}
    </div>
  </nav>
</div>
    </>
  )
}

export default Sidebar
