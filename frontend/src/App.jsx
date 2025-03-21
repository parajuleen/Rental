import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import Admin from "./Components/Admin";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Landing from "./Components/Landing";
import UserLists from "./Components/UserLists";
import ProtectedRoute from "./Components/ProtectedRoute";
import Welcome from "./Components/Welcome";
import Createposts from "./Pages/Createposts";
import Browseposts from "./Pages/Browseposts";
import Posts from "./Components/Posts";
import Details from "./Pages/Details";
import Cart from "./Components/Cart";





const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path='/editprofile' element={<EditProfile/>}/>
          <Route path="/create" element={<Createposts/>} />
          <Route path="/posts" element={<Browseposts/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="posts/:id" element={<Details/>}/>


            <Route path="/dashboard" element={<Dashboard/>} >
            <Route index element={<Welcome/>} />
            <Route path="admin" element={<Admin />} />
            <Route path="users" element={<UserLists/>}/>
            <Route path='listings/:status' element={<Posts/>}/>

          </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
