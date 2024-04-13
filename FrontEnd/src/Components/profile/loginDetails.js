import React, { useState } from 'react';

const LoginDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isPassEditing, setIsPassEditing] = useState(false);
    const [loginData, setLoginData] = useState({
        email: 'example@example.com',
        mobile: '+1234567890',
    });
    const [passwords, setPasswords] = useState({
        oldPassword: "*******",
        newPassword: "*******",
        confirmPassword: "*******"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({ ...prevState, [name]: value }));
    };

    const updateLoginDetails = () => {
        console.log('Updated login details:', loginData);
        setIsEditing(false);
    };

    const updatePasswordDetails = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }
        console.log('Updated password details:', passwords);
        setIsPassEditing(false);
    };

    return (
        <div className="w-full mx-auto rounded-lg">
            <div className="p-4 bg-gray-100 rounded-md shadow-xl">
                {Object.entries(loginData).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="text-dark-cyan font-bold mb-1 capitalize">{key}:</label>
                        <input
                            type={key === 'email' ? 'email' : 'text'}
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className={`w-full p-2 rounded-md border ${isEditing ? 'border-dark-cyan focus:ring-dark-cyan' : 'border-gray-300'} transition-colors`}
                            style={{ backgroundColor: isEditing ? '#FFFFFF' : '#F9FAFB' }}
                        />
                    </div>
                ))}
                <div className="flex justify-between mt-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={updateLoginDetails}
                                className="bg-deep-purple hover:bg-dark-cyan text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-dark-cyan hover:bg-deep-purple text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Password Change Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-xl">
                {Object.entries(passwords).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="text-dark-cyan font-bold mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
                        <input
                            type="password"
                            name={key}
                            value={value}
                            onChange={handlePasswordChange}
                            readOnly={!isPassEditing}
                            className={`w-full p-2 rounded-md border ${isPassEditing ? 'border-dark-cyan focus:ring-dark-cyan' : 'border-gray-300'} transition-colors`}
                            style={{ backgroundColor: isPassEditing ? '#FFFFFF' : '#F9FAFB' }}
                        />
                    </div>
                ))}
                <div className="flex justify-between mt-4">
                    {isPassEditing ? (
                        <>
                            <button
                                onClick={updatePasswordDetails}
                                className="bg-deep-purple hover:bg-dark-cyan text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsPassEditing(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsPassEditing(true)}
                            className="bg-dark-cyan hover:bg-deep-purple text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Change Password
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginDetails;
