import React, { useState } from 'react';
import AddPackage from '@/Components/admin/addPackage'
import AddHotel from '@/Components/admin/addHotel'
import Dashboard from '@/Components/admin/dashboard';
import AllPackages from '@/Components/admin/allPackages';
import AllHotels from '@/Components/admin/allHotels';


const AdminDashboard = () => {
    const [selectedPage, setSelectedPage] = useState('dashboard')


    const renderPage = () => {
        switch (selectedPage) {
            case 'dashboard':
                return <Dashboard />
            case 'addPackage':
                return <AddPackage />;
            case 'addHotel':
                return <AddHotel />;
            case 'allPackages':
                return <AllPackages />;
            case 'allHotels':
                return <AllHotels />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='w-full h-[90vh] overflow-hidden flex gap-4 scroll-bar'>
                <div className="w-80 flex flex-col gap-6 h-screen p-6 pt-10 bg-dark-cyan">
                    <h1 className="text-2xl font-bold text-deep-purple text-center rounded-md bg-white p-2 shadow-md mb-4">Admin Panel</h1>
                    <ul className="text-white">
                        <li
                            onClick={() => setSelectedPage('dashboard')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-deep-purple bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Dashboard</li>
                        <li
                            onClick={() => setSelectedPage('allPackages')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-deep-purple bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Packages</li>
                        <li
                            onClick={() => setSelectedPage('allHotels')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-deep-purple bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Hotels</li>
                        <li
                            onClick={() => setSelectedPage('addHotel')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-deep-purple bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Add Hotels</li>
                        <li
                            onClick={() => setSelectedPage('addPackage')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-deep-purple bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Add Package</li>
                    </ul>
                </div>

                {/* component */}
                <div className="h-[90vh] w-full overflow-scroll pt-4 pb-4" style={{ scrollbarWidth: "none" }}>
                    {renderPage()}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
