import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import { Home } from 'lucide-react';


const Layout = () => {

  return (
    <>
       <div className="min-h-screen bg-white">

       <Navbar/>
       <Outlet/>
       </div>
    
  
    </>
    
  )
}

export default Layout
