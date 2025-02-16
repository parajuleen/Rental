import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { createPost } from "../Store/Features/itemSlice";
import { useDispatch,useSelector } from "react-redux";
import { categories } from "../Utility/Categories";



const Createposts = () => {
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors ,isSubmitting},
  } = useForm();

  const [images, setProductimages] = useState([]);

  const handleImageChange = (e) => {
    // setProductimages([...images,...Array.from(files)])
    //  setValue('productImages',images,{
    //   shouldValidate:true
    // })
    // dont setValue after setProductimages...callback should be used instead of setProductimages([...images, ...Array.from(files)]) because
    // state update won't immediately reflect the updated state value because state updates in React are asynchronous.

    const files = e.target.files;
    setProductimages((prev) => {
      const updatedImg = [...prev, ...Array.from(files)];
      setValue("productImages", updatedImg, {
        shouldValidate: true,
      });
      return updatedImg;
    });
  };

  const submitData = (data) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("description", data.description);
    formData.append("availableQuantity", data.availableQuantity);
    formData.append("unitPrice", data.unitPrice);
    formData.append("category", data.category);
    formData.append("availability", data.availability);
    data.productImages?.forEach((img)=>
      formData.append("productImages",img)
    )
    dispatch(createPost(formData))
  };

  const clearImage = (number) => {
    const updatedImg = images.filter((_, index) => index !== number);
    setProductimages(() => {
      setValue("productImages", updatedImg, {
        shouldValidate: true,
      });
      return updatedImg;
    });
  };

  return (
    <>
    {}
      <div className="min-h-screen bg-gray-600 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                List a Rental Item
              </h1>

              <form
                className="space-y-6 "
                onSubmit={handleSubmit(submitData)}
                type="multipart/data"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="itemName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Item Name *
                    </label>
                    <input
                      {...register("itemName", {
                        required: {
                          value: true,
                          message: "Please enter a name for your item",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "Please enter a name with at least 3 characters",
                        },
                      })}
                      type="text"
                      id="itemName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter item name"
                    />
                    {errors.itemName?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.itemName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category *
                    </label>
                    <select
                      {...register("category", {
                        required: {
                          value: true,
                          message: "Please select a category",
                        },
                      })}
                      id="category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description *
                  </label>
                  <textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Please enter a description",
                      },
                      minLength: {
                        value: 100,
                        message:
                          "Description must be at least 50 characters long",
                      },
                      maxLength: {
                        value: 200,
                        message: "Description must not exceed 200 characters",
                      },
                    })}
                    id="description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the item in detail..."
                  />
                  {errors.description?.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images
                  </label>

                  <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    {images.length === 0 ? (
                      <div className="w-full flex flex-col items-center space-y-2 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <label
                          htmlFor="productImages"
                          className="cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            {...register("productImages", {
                              validate: (files) => {
                                console.log(files)
                                if (files.length === 0)
                                  return "Please select at least one file";
                                if (files.length > 5)
                                  return "Please select a maximum of 5 files";
                                return true;
                              },
                            })}
                            onChange={handleImageChange}
                            id="productImages"
                            name="productImages"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            multiple
                          />
                        </label>
                        <p className="text-xs text-gray-500">PNG, JPG</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-4 w-full">
                          {images.map((img, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(img)}
                                alt="Preview"
                                className="max-h-32 rounded-lg object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => clearImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor="productImages"
                            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                          >
                            Upload More
                            <input
                              {...register("productImages", {
                                validate: (files) => {
                                  if (files.length === 0)
                                    return "Please select at least one file";
                                  if (files.length > 5)
                                    return "Please select a maximum of 5 files";
                                  return true;
                                },
                              })}
                              onChange={handleImageChange}
                              id="productImages"
                              name="productImages"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                  {errors.productImages?.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.productImages.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="unitPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Unit Price (per day) *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        $
                      </span>
                      <input
                        {...register("unitPrice", {
                          required: {
                            value: true,
                            message: "Unit Price is required",
                          },
                        })}
                        type="number"
                        id="unitPrice"
                        name="unitPrice"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    {errors.unitPrice?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.unitPrice.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="availableQuantity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Available Quantity *
                    </label>
                    <input
                      {...register("availableQuantity", {
                        required: {
                          value: true,
                          message: "Available Quantity is required",
                        },
                      })}
                      type="number"
                      id="availableQuantity"
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter quantity"
                    />
                    {errors.availableQuantity?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.availableQuantity.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <input
                      {...register("availability", {
                        required: {
                          value: true,
                          message: "Must be available for rent",
                        },
                      })}
                      type="checkbox"
                      id="availability"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="availability"
                      className="text-sm font-medium text-gray-700"
                    >
                      Available for Rent
                    </label>
                    {errors.availability?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.availability.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-6 py-3  text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors   ${isSubmitting ? "bg-gray-400 cursor-not-allowed":" bg-blue-600  hover:bg-blue-700 hover:cursor-pointer"}`}
                    disabled={isSubmitting}
                  >
                    List Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createposts;
