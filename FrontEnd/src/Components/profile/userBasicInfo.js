import React, { useState } from 'react';

const UserBasicInfo = () => {
  const [userData, setUserData] = useState({
    username: 'johndoe',
    name: 'John Doe',
    gender: 'Male',
    dob: '1990-01-01',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    profilePhoto: '/path/to/profile-photo.jpg', // Example path to profile photo
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="w-full mt-10 p-6 bg-gray-200 rounded-lg shadow-xl">
      <div className="text-center">
        <img src="/user.jpg" alt="Profile" className="w-32 h-32 mx-auto rounded-full mb-4" />
        <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
      </div>
      <div className="w-full mt-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
        <input
          type="text"
          name="gender"
          value={userData.gender}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={userData.dob}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UserBasicInfo;
