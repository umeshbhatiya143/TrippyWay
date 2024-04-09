import React from 'react'
import { IoMdStar } from "react-icons/io";

const Card = () => {
    return (
        <div className="flex flex-col w-full max-w-72 bg-dark-cyan bg-opacity-15 rounded-md">
            <div className='h-48 relative rounded-md overflow-hidden'>
                <img src="/slide1.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 p-1 px-2 rounded-xl font-bold right-2 bg-deep-purple text-white text-sm">12% Off</div>
                <div className="absolute bottom-2 left-2  px-2 rounded-xl text-sm text-white font-boild bg-gray-600">4days/5nights</div>
            </div>
            {/* desc */}
            <div className="justify-between flex items-center px-2">
                <div>
                    <h2 className="text-xl font-medium">Title</h2>
                    <div className="items-center font-sans md:text-xl font-bold">
                        <span>&#8377;</span>
                        22000
                        <sup>*</sup>
                        <div className="ml-4 relative inline-block">
                            <span className="relative z-10 text-deep-purple text-sm">40,000</span>
                            <div className="absolute w-full h-0.5 bg-deep-purple top-1/2 transform -translate-y-1/2"></div>
                        </div>
                    </div>
                </div>
                {/* rteviews */}
                <div className='flex'><span className="text-sm">4</span><IoMdStar color='yellow'/></div>
            </div>
        </div>
    )
}

export default Card