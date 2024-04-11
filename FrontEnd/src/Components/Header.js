import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowSignup, logout } from '@/store/slices';
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Login from '@/Components/login'
import Signup from '@/Components/signup'

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const showLogin = useSelector((state) => state.logIn.value)
    const showRegister = useSelector((state) => state.signUp.value)
    // const isLoggedIn = useSelector((state) => state.auth.loggedIn);
    const [isLoggedIn, setIsloggedIn] = useState(true)

    // useEffect(()=>{
    //     alert(showLogin);
    // }, [])


    const goToProfilePage = () => {
        router.push('/profile/umesh'); // Replace '/profile' with the actual route to the profile page
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
                <p className="w-full text-red-600 text-center">For a limited-time discount: "50% off for the next 48 hours! Don't miss out!"</p>
            </div>

            {/* bg-gradient-to-bl from-dark-cyan to-deep-purple via-custom-black text-white */}

            {/* header */}
            <header className="bg-gray-900 text-gray-100 shadow py-4">
                <div className="container mx-auto flex justify-between items-center px-6 lg:px-12">
                    {/* Logo and Navigation */}
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-12 lg:h-14 mr-8" />
                        <nav>
                            <ul className="flex items-center space-x-10">
                                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/holidays/packages" className="hover:text-white transition-colors">Holidays</a></li>
                                <li><a href="/holidays/activities" className="hover:text-white transition-colors">Activities</a></li>
                                <li><a href="/blogs/0" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="/offers" className="hover:text-white transition-colors">Offers</a></li>
                            </ul>

                            {/* <ul className="flex items-center space-x-10">
                                <li className="hover:text-white transition-colors"
                                    onClick={goToProfilePage('/')}>
                                    Home
                                </li>
                                <li className="hover:text-white transition-colors"
                                    onClick={goToProfilePage('/holidays/packages')}>
                                    holidays
                                </li>
                                <li className="hover:text-white transition-colors"
                                    onClick={goToProfilePage('/holidays/activities')}>Activities
                                </li>
                                <li className="hover:text-white transition-colors"
                                    onClick={goToProfilePage('/blogs/0')}>Blogs
                                </li>
                                <li className="hover:text-white transition-colors"
                                    onClick={goToProfilePage('/offers')}>offers
                                </li>
                            </ul> */}
                        </nav>
                    </div>

                    {/* Authentication Section */}
                    <div>
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-6">
                                <a href="#" className="flex items-center justify-center space-x-2 bg-button-color hover:bg-button-color-hover transition-colors py-2 px-4 rounded-full">TrippyAI</a>
                                <button onClick={goToProfilePage} className="flex items-center justify-center space-x-2 bg-button-color hover:bg-button-color-hover transition-colors py-2 px-4 rounded-full">
                                    <CgProfile size={24} />
                                    <span>Profile</span>
                                </button>
                                {/* <BsCart size={30} className='text-deep-purple'/> */}

                                <a href="#" className="relative">
                                    <PiShoppingCartSimpleFill size={40} />
                                    <span className='absolute top-2.5 text-deep-purple right-3.5 text-sm'>4</span>
                                </a>

                            </div>
                        ) : (
                            <div className='flex space-x-6'>
                                <button onClick={() => dispatch(setShowLogin())} className="bg-button-color hover:bg-button-color-hover transition-colors py-2 px-4 rounded-full text-sm">
                                    Become a Agent
                                </button>
                                <button onClick={() => dispatch(setShowLogin())} className="bg-button-color hover:bg-button-color-hover transition-colors py-2 px-4 rounded-full text-sm">
                                    Login / Signup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>





        </>
    );
};

export default Header;
