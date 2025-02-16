import React from 'react'
import Sidebar from '../Pages/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserLists from './UserLists'
import Admin from './Admin'

const Dashboard = () => {

const {role,name}= useSelector(state=>state.auth.user)

  return (
    <>
    <div className=" min-h-screen flex w-full md:p-2 gap-2 ">
     <Sidebar/> 
      <Outlet/>
   
    </div> 
    

    </>
  )
}

export default Dashboard
