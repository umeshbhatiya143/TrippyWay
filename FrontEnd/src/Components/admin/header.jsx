import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { toggleLogin, loginUser, logoutUser } from '@/store/slices';
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Login from '@/Components/login'
import Signup from '@/Components/signup'

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const showSignup = useSelector((state) => state.modalVisibility.signup)
    const showLogin = useSelector((state) => state.modalVisibility.login)
    const userData = useSelector((state) => state.auth.userData)
    const [isShowMenu, setIsShowMenu] = useState(false);

    // useEffect(()=>{
    // //   console.log(userData)
    // alert(isLoggedIn)
    // }, [isShowMenu])


    const goToProfilePage = (path) => {
        router.push(path); // Replace '/profile' with the actual route to the profile page
    };

    return (
        <>

            {/* show login signup pages */}
            {showLogin === true && <div className="flex justify-center items-center w-full fixed z-30 transition-all duration-1000 bg-black bg-opacity-50 h-screen">
                <Login />
            </div>}
            {showSignup === true && <div className="flex justify-center items-center w-full fixed z-30 transition-all duration-1000 bg-black bg-opacity-50 h-screen">
                <Signup />
            </div>}


            {/* bg-gradient-to-bl from-dark-cyan to-deep-purple via-custom-black text-white */}

            {/* header */}
            <header className="w-full fixed z-20 text-gray-100 shadow ">

                {/* offers slider */}
                <div className="w-full pipe-slider overflow-hidden flex items-center justify-center py-2 bg-white text-center z-10">
                    <p className="w-full text-red-600 text-center">For a limited-time discount: "50% off for the next 48 hours! Don't miss out!"</p>
                </div>
                <div className='bg-white text-black border-t-2 border '>
                    <div className="container mx-auto flex justify-between items-center   px-6 lg:px-12">
                        {/* Logo and Navigation */}
                        <div onClick={() => goToProfilePage('/')}
                            className="flex items-center mt-1 mb-1 cursor-pointer">
                            <img src="/logo.png" alt="Logo" className="h-20 w-60 object-cover" />
                            <nav>
                                {/* <ul className="flex items-center space-x-10">
                                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/holidays/packages" className="hover:text-white transition-colors">Holidays</a></li>
                                <li><a href="/holidays/activities" className="hover:text-white transition-colors">Activities</a></li>
                                <li><a href="/blogs/0" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="/offers" className="hover:text-white transition-colors">Offers</a></li>
                            </ul> */}

                                {/* <ul className="flex items-center">
                                    <li className="hover:text-button-color hover:bg-white cursor-pointer p-2 px-6 rounded-full transition-colors duration-600"
                                        onClick={() => goToProfilePage('/')}>
                                        Home
                                    </li>
                                    <li className="hover:text-button-color hover:bg-white cursor-pointer p-2 px-6 rounded-full transition-colors duration-600"
                                        onClick={() => goToProfilePage('/holidays')}>
                                        holidays
                                    </li>
                                    <li className="hover:text-button-color hover:bg-white cursor-pointer p-2 px-6 rounded-full transition-colors duration-600"
                                        onClick={() => goToProfilePage('/blogs/0')}>Blogs
                                    </li>
                                    <li className="hover:text-button-color hover:bg-white cursor-pointer p-2 px-6 rounded-full transition-colors duration-600"
                                        onClick={() => goToProfilePage('/offers')}>offers
                                    </li>
                                </ul> */}
                            </nav>
                        </div>

                        {/* Authentication Section */}
                        <div className="flex text-white items-center space-x-6">
                            {/* <a href="#" className="flex items-center justify-center space-x-2 bg-dark-cyan hover:bg-button-color-hover bg-gradient-to-bl from-dark-cyan to-deep-purple  text-white transition-colors py-2 px-4 rounded-full">TourAI</a> */}
                            <div className='relative z-1'
                            >
                                <button onClick={() => {
                                    localStorage.setItem("adminLogin", "")
                                    window.location.reload()
                                }
                                }
                                    className="flex items-center justify-center space-x-2 bg-gradient-to-bl from-deep-purple to-dark-cyan text-white bg-dark-cyan hover:bg-button-color-hover transition-colors py-2 px-4 rounded-full">
                                    <span>Logout</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </>
    );
};

export default Header;
