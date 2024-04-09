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
            <header className="bg-gradient-to-r from-dark-cyan to-deep-purple text-custom-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
                    {/* Left section */}
                    <div className="flex items-center gap-4">
                        <img src="/logo.png" alt="Logo" className="h-14" />
                        <nav>
                            <ul className="hidden md:flex gap-6">
                                <li><a href="/" className="hover:text-custom-black transition-colors duration-200">Home</a></li>
                                <li><a href="/holidays/packages" className="hover:text-custom-black transition-colors duration-200">Holidays</a></li>
                                <li><a href="/holidays/activities" className="hover:text-custom-black transition-colors duration-200">Activities</a></li>
                                <li><a href="/blogs/0" className="hover:text-custom-black transition-colors duration-200">Blog</a></li>
                                <li><a href="/offers" className="hover:text-custom-black transition-colors duration-200">Offers</a></li>
                            </ul>
                        </nav>
                    </div>

                    {/* Right section */}
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-custom-black transition-colors duration-200">Agent</a>
                            <a href="#" className="text-sm bg-custom-black hover:bg-deep-purple text-custom-white font-bold py-2 px-4 rounded-full shadow hover:shadow-lg transition-all duration-300">TrippyAI</a>
                            <button onClick={goToProfilePage} className="text-custom-white hover:text-deep-purple transition-colors duration-300">
                                <CgProfile size={30} />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => dispatch(setShowLogin())} className="flex items-center justify-center gap-2 bg-custom-black hover:bg-deep-purple text-custom-white py-2.5 px-5 rounded-md shadow hover:shadow-lg transition-all duration-300">
                            Login / Signup
                        </button>
                    )}
                </div>
            </header>

        </>
    );
};

export default Header;
