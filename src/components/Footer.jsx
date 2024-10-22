import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
function Footer() {
    return (
        <footer className="text-gray-600  body-font border-t-2">
            <div className="container px-5 py-16 mx-auto  flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap items-center flex-col  ">
                <div className="w-fit flex-shrink-0 md:mx-0 sm-mx-0 mx-auto text-center md:text-left">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <img src={logo} alt="logo" className='w-6 mr-1'/> <span className="text-xl poppins-bold">Furniro</span>
                    </a>
                    <p className="mt-2  text-sm text-gray-500">
                        Air plant banjo lyft occupy retro adaptogen indego
                    </p>
                </div>
                <div className="poppins-regular  flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/3  md:w-1/3 sm:w-1/3 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                            Links
                        </h2>
                        <nav className=" font-semibold list-none mb-10 text-sm">
                        <Link
                        to={""}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:text-gray-400"
                    >
                        Home
                    </Link>
                    <Link
                        to={"shop"}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:text-gray-400"                    >
                        Shop
                    </Link>
                    <Link
                        to={"about"}
                        
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:text-gray-400"                    >
                        About
                    </Link>
                    <Link
                        to={"contact"}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:text-gray-400"                    >
                        Contact
                    </Link>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/3 sm:w-1/3 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                            Help
                        </h2>
                        <nav className=" font-semibold list-none mb-10 text-sm">
                            <li className='py-2'>
                                <a className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
                            </li>
                            <li className='py-2'>
                                <a className="text-gray-600 hover:text-gray-800">FAQs</a>
                            </li>

                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/3 sm:w-1/3 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                            NewSettler
                        </h2>
                        <nav className="list-none mb-10">
                            <li >
                            </li>



                        </nav>
                    </div>
                </div>
            </div>
            <div className='border-t-2'>
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © 2024 Funiro —
                        <a
                            href="https://twitter.com/knyttneve"
                            rel="noopener noreferrer"
                            className="text-gray-600 ml-1"
                            target="_blank"
                        >
                            @nomanpervaiz035@gmail.com
                        </a>
                    </p>

                </div>
            </div>
        </footer>

    )
}

export default Footer