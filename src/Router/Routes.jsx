
import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../public/Layout'
import Home from '../public/Home'
import About from '../public/About'
import Shop from '../public/Shop'
import Contact from '../public/Contact'
import ProductDetail from '../public/ProductDetail'
import Checkout from '../private/Checkout'
import AppNotFound from '../public/AppNotFound'
import Login from '../public/Login'
import Register from '../public/Register'
import { ContextOfUser } from '../context/UserContext'
import AllCart from '../public/AllCart'
import OrderHistory from '../public/OrderedHistory'


function AppRouter() {
  const userDetail = useContext(ContextOfUser)
  const { islogin } = userDetail
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Section */}
        <Route path='/login' element={islogin ? <Navigate to={"/"} /> : <Login />} />
        <Route path='/register' element={islogin ? <Navigate to={"/"} /> : <Register />} />
        {/* Public Routes */}
        <Route path='/' element={ <Layout />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='shop/:id' element={<ProductDetail />} />

          <Route path='cart' element={ <AllCart />} />
          <Route path='checkout' element={islogin ?  <Checkout /> : <Navigate to={"/login"}/>} />
          <Route path='order-history' element={islogin ?  <OrderHistory /> : <Navigate to={"/login"}/>} />
        </Route>
        {/* Not found */}
        <Route path="*" element={<AppNotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter