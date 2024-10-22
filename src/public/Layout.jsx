import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Header/>
            <div className='min-h-96'>
                <Outlet/>
            </div>
        <Footer/>
    </>
  )
}

export default Layout