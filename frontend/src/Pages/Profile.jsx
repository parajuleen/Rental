import { React, useEffect } from "react";
import placeholder from "../Assets/placeholder.png";
import { useDispatch,useSelector } from "react-redux";
import { getUser } from "../Store/Features/userSlice";
import { useNavigate } from "react-router-dom";
import { Pencil, Mail, Phone, MapPin, User, Shield } from 'lucide-react';

const Profile = () => {
  
  const disptach = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    disptach(getUser());
  }, []);

  const user = useSelector((state) => state.user.data);

  return (
    <>
   
  
         <div className="w-full px-4 lg:px-8 py-8 flex justify-center">
      <div className="bg-white w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="relative group">
              {user?.profile ? (
                <img
                  src={user.profile}
                  alt="profile"
                  className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <img
                  src={placeholder}
                  alt="profile"
                  className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
              )}
              <button 
                onClick={() => navigate('/editprofile')}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <Pencil className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-24 px-8 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.name || 'User Name'}</h1>
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {user?.role || 'Role'}
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <Mail className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <Phone className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone</p>
                <p className="text-gray-800">{user?.phone}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <MapPin className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Address</p>
                <p className="text-gray-800">{user?.address}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <User className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Status</p>
                <p className="text-gray-800">{user?.status}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <Shield className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Role</p>
                <p className="text-gray-800">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      
    </>
  );
};

export default Profile;
