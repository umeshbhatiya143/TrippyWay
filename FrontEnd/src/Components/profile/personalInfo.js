import React, { useState } from 'react';
import { BiSolidPencil } from "react-icons/bi";

const UserBasicInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    "username": 'johndoe',
    "full Name": 'John Doe',
    "gender": 'Male',
    "dob": '1990-01-01',
    "pincode": "1234567",
    "state": "xyz",
    "address": '123 Main St, City, Country',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUserProfile = () => {
    // Function to update user profile
    // After update, you might want to set `isEditing` to false
    setIsEditing(false);
    console.log('Profile updated:', userData);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className='flex justify-between bg-gray-200 shadow-xl items-center px-6 rounded-lg relative'>
        <div className="text-center rounded-lg border p-6 w-80 realtive">
          <img src="/user.jpg" alt="Profile" className="w-60 h-60 mx-auto rounded-full mb-4" />
          <div className="relative right-0">
            <label htmlFor="photo" className="absolute bottom-12 right-5 bg-dark-cyan p-3 text-gray-200 flex justify-center items-center rounded-full cursor-pointer"><BiSolidPencil /></label>
            <input type="file" className='hidden' name='photo' id='photo' />
          </div>
        </div>
        {/* buttons */}
        <div className='flex gap-10 h-fit items-center pr-10'>
          {/* <div className='h-fit'>
            <label htmlFor="photo" className="bg-dark-cyan bg-opacity-50 hover: transition-all duration-600 py-2 px-10 text-white rounded-full cursor-pointer">Edit</label>
            <input type="file" className='hidden' name='photo' id='photo' />
          </div> */}
          <div className='bg-button-color hover:bg-button-color-hover bg-opacity-50 transition-all duration-600 py-1.5 h-fit px-10 text-white rounded-full cursor-pointer'>
            Remove
          </div>
        </div>
      </div>
      <div className="w-full mt-4 bg-gray-200 rounded-lg shadow-xl p-6 ">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">{key}:</label>
            <input
              type={key === 'dob' ? 'date' : 'text'}
              name={key}
              value={value}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 ${!isEditing ? 'bg-gray-200' : 'bg-white'}`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={updateUserProfile}
          className="bg-deep-purple hover:bg-opacity-75 transition-all duration-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Update
        </button>
        <button
          type="button"
          onClick={toggleEdit}
          className="bg-dark-cyan hover:bg-opacity-75 transition-all duration-600 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default UserBasicInfo;
