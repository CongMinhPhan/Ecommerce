import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    phoneNumbers: user?.phoneNumbers || [],
    addresses: user?.addresses || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input type="text" id="name" name="name" value={userData?.name} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Current Password:</label>
          <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" value={userData.newPassword} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password:</label>
          <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={userData.confirmNewPassword} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumbers" className="block text-sm font-medium text-gray-700">Phone Numbers:</label>
          {userData.phoneNumbers.map((phoneNumber, index) => (
            <input key={index} type="text" name={`phoneNumbers[${index}]`} value={phoneNumber} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
          ))}
          <button type="button" className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setUserData(prevData => ({ ...prevData, phoneNumbers: [...prevData.phoneNumbers, ''] }))}>Add Phone Number</button>
        </div>

        <div className="mb-4">
          <label htmlFor="addresses" className="block text-sm font-medium text-gray-700">Addresses:</label>
          {userData.addresses.map((address, index) => (
            <input key={index} type="text" name={`addresses[${index}]`} value={address} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring focus:ring-gray-400 focus:outline-none" />
          ))}
          <button type="button" className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setUserData(prevData => ({ ...prevData, addresses: [...prevData.addresses, ''] }))}>Add Address</button>
        </div>

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Update Information</button>
      </form>
    </div>
  );
}

export default UserInfo;
