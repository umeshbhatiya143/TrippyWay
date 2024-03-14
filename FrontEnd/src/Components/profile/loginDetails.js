import React, { useState } from 'react';

const LoginDetails = () => {
    const [editMode, setEditMode] = useState(false);
    const [loginData, setLoginData] = useState({
        email: 'example@example.com',
        password: '********', // Assuming password should be masked for security
        mobile: '+1234567890',
    });

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        // Here you can implement the logic to update the login details
        console.log('Updated login details:', loginData);
        // For simplicity, let's toggle edit mode after update
        toggleEditMode();
    };

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login Details</h2>
            <div className="mt-4">
                {editMode ? (
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" value={loginData.email} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                            <input type="text" id="mobile" name="mobile" value={loginData.mobile} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={handleUpdate} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
                            <button type="button" onClick={toggleEditMode} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p className='bg-white w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'><span className="font-semibold">Email:</span> {loginData.email}</p>
                        <p className='bg-white w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'><span className="font-semibold">Password:</span> {loginData.password}</p>
                        <p className='bg-white w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'><span className="font-semibold">Mobile:</span> {loginData.mobile}</p>
                        <button onClick={toggleEditMode} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginDetails;
