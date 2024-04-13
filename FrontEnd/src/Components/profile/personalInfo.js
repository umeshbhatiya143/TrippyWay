import React, { useState } from 'react';
import { BiPencil, BiTrash, BiSave } from "react-icons/bi"; // Adding BiSave for save icon

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'johndoe',
    fullName: 'John Doe',
    gender: 'Male',
    dob: '1990-01-01',
    pincode: "123456",
    state: "State",
    address: '123 Main St, City, Country'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const updateUserProfile = () => {
    setIsEditing(false);
    console.log('Profile updated:', userData);
  };

  const removeProfilePicture = () => {
    console.log('Profile picture removed');
    // Add logic to remove the profile picture
  };

  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-xl transition-shadow duration-500">
      <div className='flex justify-between items-center bg-gradient-to-r from-dark-cyan to-deep-purple p-4 rounded-lg text-white'>
        <div className="text-center">
          <img src="/user.jpg" alt="Profile" className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-sm" />
          {isEditing && (
            <div className="flex justify-center mt-3 space-x-2">
              <label htmlFor="photo" className="cursor-pointer p-2 rounded-full text-lg bg-dark-cyan hover:bg-deep-purple transition-colors">
                <BiPencil />
                <input type="file" id='photo' name='photo' className='hidden' />
              </label>
              <button onClick={removeProfilePicture} className="p-2 rounded-full bg-dark-cyan hover:bg-deep-purple transition-colors">
                <BiTrash />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleEdit}
            className={`py-2 px-4 rounded-full font-semibold transition-colors duration-300 ${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-dark-cyan hover:bg-deep-purple'}`}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={updateUserProfile}
              className="py-2 px-4 bg-deep-purple hover:bg-dark-cyan rounded-full text-white font-semibold transition-colors duration-300"
            >
              <BiSave className="inline mr-2" />
              Save
            </button>
          )}
        </div>
      </div>

      <form className="mt-4 space-y-4">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <label className="w-1/4 text-dark-cyan text-sm font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type={key === 'dob' ? 'date' : 'text'}
              name={key}
              value={value}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`flex-grow p-2 rounded-lg border-2 ${isEditing ? 'border-deep-purple focus:ring-2 focus:ring-deep-purple' : 'border-gray-200'} transition-colors`}
              style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default PersonalInfo;
