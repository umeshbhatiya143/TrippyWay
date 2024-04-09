import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowSignup, logout } from '@/store/slices';
import { CgProfile } from "react-icons/cg";
import Login from '@/Components/login'
import Signup from '@/Components/signup'

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const showLogin = useSelector((state) => state.logIn.value)
    const showRegister = useSelector((state) => state.signUp.value)
    const isLoggedIn = useSelector((state) => state.auth.loggedIn);

    // useEffect(()=>{
    //     alert(showLogin);
    // }, [])


    const goToProfilePage = () => {
        router.push('profile/umesh'); // Replace '/profile' with the actual route to the profile page
    };

    return (
        <>

            {/* show login signup pages */}
            {showLogin === "true" && <div className="flex justify-center items-center w-full fixed z-20 transition-all duration-1000 bg-black bg-opacity-70 h-screen">
                <Login />
            </div>}
            {showRegister === "true" && <div className="flex justify-center items-center w-full fixed z-20 transition-all duration-1000 bg-black bg-opacity-70 h-screen">
                <Signup />
            </div>}


            {/* offers slider */}
            <div className="w-full pipe-slider overflow-hidden flex items-center justify-center py-2 bg-white text-center z-50">
                <p className="w-full text-black text-center">For a limited-time discount: "50% off for the next 48 hours! Don't miss out!"</p>
            </div>

            {/* header */}
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4">
                <div className="relative container mx-auto flex justify-between items-center">
                    {/* Left section */}
                    <div className="flex items-center space-x-4">
                        <img src="/logo.png" alt="TrippyWay Logo" className="h-14 -ml-20 mr-10" />
                        <nav>
                            <ul className="flex space-x-6">
                                <li><a href="/" className="hover:text-gray-300">Home</a></li>
                                <li><a href="/holidays/packages" className="hover:text-gray-300">Holidays</a></li>
                                <li><a href="/holidays/activities" className="hover:text-gray-300">Activities</a></li>
                                <li><a href="/blogs/0" className="hover:text-gray-300">Blog</a></li>
                                <li><a href="/offers" className="hover:text-gray-300">Offers</a></li>
                            </ul>
                        </nav>
                    </div>

                    {/* Right section */}
                    {isLoggedIn == true && <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-gray-300">Agent</a>
                        <a href="#" className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">TrippyAI</a>
                        <button onClick={goToProfilePage} className="">
                            <CgProfile size={30} />
                        </button>
                    </div>}
                    {isLoggedIn === false && <div className="flex items-center justify-center gap-2 bg-transparent border border-white text-white py-2.5 px-5  text-base transition-all rounded-md duration-300 hover:bg-black hover:border-black cursor-pointer" 
                        onClick={() => dispatch(setShowLogin())}>
                        Login / Signup
                    </div>}
                </div>
            </header>
        </>
    );
};

export default Header;
