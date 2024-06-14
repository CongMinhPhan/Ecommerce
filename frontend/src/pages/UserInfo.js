import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import ChangePassword from '../components/ChangePassword';
import UploadAddress from '../components/UploadAddress';
import AddressItem from '../components/AddressItem';

const UserInfo = () => {
  const user = useSelector(state => state?.user?.user);
  const addressListId = user?.addresses || [];
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openUploadAddress, setOpenUploadAddress] = useState(false);
  const [userAddress, setUserAddress] = useState([]);

  const fetchUserAddress = async () => {
    try {
      const addressArray = await Promise.all(
        addressListId.map(async (addressId) => {
          const response = await fetch(SummaryApi.getAddressById.url, {
            method: SummaryApi.getAddressById.method,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ addressId })
          });
          const data = await response.json();
          if (data.success) {
            console.log('Fetched address data:', data.data);
            return data.data;
          } else {
            console.error("Failed to fetch address:", data.message);
            return null;
          }
        })
      );
      setUserAddress(addressArray.filter(address => address !== null));
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  useEffect(() => {
    fetchUserAddress();
    console.log('check user address: ', addressListId);
  }, [addressListId]);

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 overflow-hidden">
        <div className="flex-1 mb-8">
          <div className="border-b border-gray-300 pb-4 mb-8">
            <div className="flex items-center mb-8">
              {user && user.profilePic ? (
                <img src={user.profilePic} alt={user.name} className="w-24 h-24 rounded-full mr-6 shadow-md" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-700 mr-6 shadow-md">
                  {user && user.name.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-1 capitalize">{user?.name}</h2>
                <p className="text-lg text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Thông tin người dùng</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
            <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="mb-6">
                <p className="text-lg font-bold text-gray-700 mb-2">Tên: {user?.name}</p>
                <p className="text-lg font-bold text-gray-700 mb-4">Email: {user?.email}</p>
              </div>
              <div className="mt-2">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full transition-transform transform hover:scale-105 shadow-md mb-4"
                  onClick={() => setOpenChangePassword(true)}
                >
                  Đổi mật khẩu
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full transition-transform transform hover:scale-105 shadow-md"
                  onClick={() => setOpenUploadAddress(true)}
                >
                  Cập nhật địa chỉ
                </button>
              </div>
              {openChangePassword && (
                <ChangePassword onClose={() => setOpenChangePassword(false)} />
              )}
              {openUploadAddress && (
                <UploadAddress onClose={() => setOpenUploadAddress(false)} fetchData={fetchUserAddress} user={user}/>
              )}
            </div>
            <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Địa chỉ</h4>
              <div className="flex-1 overflow-y-auto max-h-96"> {/* Setting a higher max height */}
                {userAddress.length > 0 ? (
                  userAddress.map((address) => (
                    <AddressItem data={address} key={address._id} fetchData={fetchUserAddress} />
                  ))
                ) : (
                  <p className="text-lg text-gray-600">Chưa có địa chỉ</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
