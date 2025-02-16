import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {

    const isAuth=useSelector(state=>state.auth.isAuthenticated)
  return (
    <>
    {
        isAuth ? <Outlet/> :<Navigate to='/login'/>
    }
    </>
  )
}

export default ProtectedRoute
