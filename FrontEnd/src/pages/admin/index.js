import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center my-4">Admin Dashboard</h1>
            <div className="flex justify-center items-center space-x-4">
                <button
                    onClick={() => console.log('Add Package')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Add Package
                </button>
                <button
                    onClick={() => console.log('Add Hotel')}
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
    );
};

export default AdminDashboard;
