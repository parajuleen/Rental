import React from 'react';
import { Home, Key } from 'lucide-react';
import {useSelector} from 'react-redux'
import img from '../Assets/bg.png'

const user = {
  name: "John Doe",
  role: "Rental Manager",
  lastLogin: "2024-03-15 09:30 AM"
};

const stats = [
  { title: "Active Listings", value: "124", icon: Home },
  { title: "Pending Listings", value: "28", icon: Key }
];

function Welcome() {

  const {user}=useSelector(state=>state.auth)



  return (
    <div className="min-h-screen bg-gray-50 ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-xl overflow-hidden mb-8 h-64">
          <img 
            src={img}
            alt="Rental marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8">
            <span className='text-green text-4xl text-white font-bold'>Welcome</span>
              <h1 className="text-4xl text-white font-bold mb-2 pt-2">
              {user.name}!
              </h1>
              <p className="text-white">
                You're logged in as <span className="font-medium  text-3xl underline italic">{user.role.toUpperCase()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Welcome;