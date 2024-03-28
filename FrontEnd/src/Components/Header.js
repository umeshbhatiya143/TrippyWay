import React from 'react';
import { useRouter } from 'next/router';

import { CgProfile } from "react-icons/cg";

const Header = () => {
    const router = useRouter();

    const goToProfilePage = () => {
        router.push('profile/umesh'); // Replace '/profile' with the actual route to the profile page
    };

    return (
        <>
            {/* offers slider */}
            <div className="w-full pipe-slider overflow-hidden flex items-center justify-center py-2 bg-white text-center z-50">
                <p className="w-full text-black text-center">For a limited-time discount: "50% off for the next 48 hours! Don't miss out!"</p>
            </div>

            {/* header */}
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left section */}
                    <div className="flex items-center space-x-4">
                        <img src="/logo.png" alt="TrippyWay Logo" className="h-14 -ml-20 mr-10" />
                        <nav>
                            <ul className="flex space-x-6">
                                <li><a href="/" className="hover:text-gray-300">Home</a></li>
                                <li><a href="/holidays/0" className="hover:text-gray-300">Holidays</a></li>
                                <li><a href="/activities" className="hover:text-gray-300">Activities</a></li>
                                <li><a href="/blogs/0" className="hover:text-gray-300">Blog</a></li>
                                <li><a href="/offers" className="hover:text-gray-300">Offers</a></li>
                            </ul>
                        </nav>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-gray-300">Agent</a>
                        <a href="#" className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">TrippyAI</a>
                        <button onClick={goToProfilePage} className="">
                           <CgProfile size={30} />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
