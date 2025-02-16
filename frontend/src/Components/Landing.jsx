import React from 'react'
import { Camera,Music,Wrench,Shield,Clock,Star} from 'lucide-react';

const Landing = () => {
  return (
    <>
     <header className="relative h-[600px] bg-yellow-300">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80"
            alt="Modern apartment interior"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/50">
          </div>
        </div>
        
        <div className="relative z-1 max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Find Your Perfect Rental Items
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              Discover thousands of rental items in your desired location.
            </p>
            <span className='text-4xl font-bold italic text-white'> List with Ease, Borrow with Trust!</span>
            
          </div>
        </div>
      </header>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Items Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Camera className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cameras</h3>
              <p className="text-gray-600">Find modern cameras and lenses at affordable prices</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Music className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Music</h3>
              <p className="text-gray-600">Discover muscial instruments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Wrench className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Utility</h3>
              <p className="text-gray-600">Premium equipments </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentEase</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Properties</h3>
              <p className="text-gray-600">All our listings are verified and trustworthy</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock support for all your needs</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600">Get the best deals on premium products</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
