import React from 'react';
import { IoMdStar } from "react-icons/io";

const Card = () => {
    return (
        <div className="flex flex-col w-[340px] bg-dark-cyan bg-opacity-15 rounded-md shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className='h-52 relative rounded-md overflow-hidden'>
                <img src="/slide1.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 p-1 px-2 rounded-xl font-bold right-2 bg-red-500 text-white text-sm">12% Off</div>
                <div className="absolute bottom-2 left-2 py-1 px-4 rounded-full text-sm text-white font-bold bg-gray-700">5 days/4 nights</div>
            </div>
            {/* desc */}
            <div className="justify-between flex items-center px-4 py-2">
                <div>
                    <h2 className="text-xl font-medium">Title</h2>
                    <div className="items-center text-deep-purple font-sans md:text-xl font-bold flex">
                        <span>&#8377;</span>
                        22000
                        <sup>*</sup>
                        <div className="ml-2 relative inline-block">
                            <span className="relative text-gray-600 font-normal text-[16px]">
                                40000
                            </span>
                            <div className="absolute w-full h-[2px] bg-gray-900 top-1/2"></div>
                        </div>
                    </div>
                </div>
                {/* reviews */}
                <div className='flex justify-center items-center text-yellow-500'>
                    <span className="text-lg font-bold">4.0</span>
                    <IoMdStar size={20} className="ml-1" />
                </div>
            </div>
        </div>
    )
}

export default Card;
