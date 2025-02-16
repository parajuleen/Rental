import {React,useEffect,useState} from 'react'
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from '../Store/Features/userSlice';
import { useNavigate } from 'react-router-dom';
import { Camera, X ,Check} from 'lucide-react';


const EditProfile = () => {
    const [img, setImg] = useState("");    
      const disptach = useDispatch();
      const navigate=useNavigate()
    

        


      const btnRef = useRef();
      const {data,status} = useSelector((state) => state.user);
  

      useEffect(()=>{
        if(status ==200){
          setTimeout(()=>{
            navigate('/profile')
  
          },[5000])
        }
      },[status])

      
        const {
          handleSubmit,
          register,
          setValue,
          reset,
          formState: { errors, dirtyFields, isDirty },
        } = useForm({
          defaultValues: {
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            address: data?.address,
            profile:data?.profile
          },
        });
      
        const handleImage = (e) => {
          const file = e.target.files[0];
      
          setValue("profile", file,{
            shouldDirty: true
          })
          setImg(URL.createObjectURL(file))
        };
      
      
      
        const fieldKeys = Object.keys(dirtyFields); //Gives an array of the keys of objects as objects are not iterable
      
      
        const editProfile = (data) => {
      
            const formData = new FormData();
      
          fieldKeys.map((field) => {
            if (dirtyFields[field]) {
              formData.append(field, data[field]); //data[field] dynamically accesses properties based on the value of field.
            }
          })
      
          disptach(updateProfile(formData));
        };
  return (
    <>
         <div className="w-full px-4 lg:px-8 py-8 flex justify-center relative">
          { status== 200 && <div className='bg-green-300 absolute top-1 right-4 h-12 w-48 rounded-lg flex items-center gap-2 px-2'>
          <span className="font-medium text-md">Profile Updated!</span>
          <Check className="w-6 h-6 font-bold" />
            </div>}
      
      <form
        onSubmit={handleSubmit(editProfile)}
        className="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={ data?.profile || img}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => (
                    btnRef.current?.click()
                  )
                    }
                  className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors group-hover:scale-105"
                >
                  <Camera className="w-5 h-5 text-blue-600" />
                </button>
                <input
                  {...register('profile')}
                  ref={btnRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>
          </div>

          <div className="pt-24 px-8 pb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                  })}
                  defaultValue={data?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message }</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  defaultValue={data?.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message }</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  defaultValue={data?.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message }</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  {...register("address", {
                    required: "Address is required",
                  })}
                  defaultValue={data?.address}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message }</p>
                )}
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors
                    ${isDirty 
                      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setImg('');
                    navigate('/profile');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}

export default EditProfile
