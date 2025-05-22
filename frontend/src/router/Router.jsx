import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/header.jsx";
import Register from "../component/register.jsx";
import Home from "../page/home.jsx";
import Search from "../page/searchpage.jsx";
import Login from "../component/login.jsx";
import Catagory from "../component/Catagory.jsx";
import Forget from "../component/forgetpassword.jsx";
import Ordersummry from "../component/ordersummry.jsx";
import Product from "../component/product.jsx";
import OtpVerification from "../component/OtpVerification.jsx";
import User from "../component/usermanumobile.jsx";
import Dashboard from "../layout/doshboard.jsx";
import Profile from "../component/profile.jsx";
import Orders from "../component/order.jsx";
import Address from "../component/adderss.jsx";
export default function Router() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category" element={<Catagory />} />
          <Route path="/forget-password" element={<Forget />} />
          <Route path="/orderSummry" element={<Ordersummry />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Otp" element={<OtpVerification />} />
          <Route path="/user" element={<User />} />
          {/* Dashboard layout with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Nested routes rendered inside <Outlet /> in Dashboard */}
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<Address />} />
          </Route>
          {/* other routes */}
        </Routes>
      </div>
    </>
  );
}
