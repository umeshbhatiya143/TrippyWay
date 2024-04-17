import React, { useState } from 'react';
import AddPackage from '@/Components/admin/addPackage'
import AddHotel from '@/Components/admin/addHotel'

const AdminDashboard = () => {
    const [isShowPackageForm, setIsShowPackageForm] = useState(false)
    const [isShowHotelForm, setIsShowHotelForm] = useState(false)
    return (
        <>
            {isShowPackageForm === true && <div className="flex justify-center items-center w-full z-30 transition-all duration-1000 bg-black h-fit bg-opacity-50">
                <AddPackage setIsShowPackageForm={setIsShowPackageForm} isShowPackageForm={isShowPackageForm}/>
            </div>}

            {isShowHotelForm === true && <div className="flex justify-center items-center w-full z-30 transition-all duration-1000 bg-black h-fit bg-opacity-50">
                <AddHotel setIsShowHotelForm={setIsShowHotelForm} isShowHotelForm={isShowHotelForm}/>
            </div>}

            <div className="w-full h-screen mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center my-4">Admin Dashboard</h1>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={() => setIsShowPackageForm(!isShowPackageForm)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Add Package
                    </button>
                    <button
                        onClick={() => setIsShowHotelForm(!isShowHotelForm)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Add Hotel
                    </button>
                    <button
                        onClick={() => console.log('Add Blog')}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Add Blog
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
