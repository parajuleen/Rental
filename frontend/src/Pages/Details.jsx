import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const Details = () => {
  const items = useSelector(state => state.item.data);
  const { id } = useParams();
  const product = items.filter((item) => item._id === id);

  const [checkoutProduct, setCheckoutProduct] = useState({
    id: product[0]._id,
    name: product[0].itemName,
    totalCost: product[0].unitPrice,
    quantity: 1
  });

  const increment = () => {
    if (checkoutProduct.quantity < product[0].availableQuantity) {
      setCheckoutProduct((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
        totalCost: prev.totalCost + product[0].unitPrice
      }));
    }
  };

  const decrement = () => {
    if (checkoutProduct.quantity > 1) {
      setCheckoutProduct((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
        totalCost: prev.totalCost - product[0].unitPrice
      }));
    }
  };

  const handleAddToCart = () => {
    console.log(checkoutProduct);
    alert('Product added to the cart', checkoutProduct);
    setCheckoutProduct((prev) => ({
      ...prev,
      quantity: 1,
      totalCost: product[0].unitPrice
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <div className="grid grid-cols-2 gap-4">
              {product[0].productImages.map((img, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={img}
                    alt={`${product[0].itemName} - View ${index + 1}`}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product[0].itemName}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product[0].description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-900">
                      ${product[0].unitPrice}
                    </span>
                    <span className="text-sm text-gray-500">per day</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">
                      {product[0].availableQuantity} units available
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={decrement}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      checkoutProduct.quantity === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                    }`}
                    disabled={checkoutProduct.quantity === 1}
                  >
                    <Minus size={20} />
                  </button>
                  
                  <span className="text-xl font-semibold w-12 text-center">
                    {checkoutProduct.quantity}
                  </span>
                  
                  <button
                    onClick={increment}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      checkoutProduct.quantity === product[0].availableQuantity
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                    }`}
                    disabled={checkoutProduct.quantity === product[0].availableQuantity}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <span className="text-gray-600 font-medium">Total Cost</span>
                    <span className="text-2xl font-bold text-blue-900">
                      ${checkoutProduct.totalCost}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 bg-blue-900 text-white rounded-lg font-semibold
                             flex items-center justify-center space-x-2 hover:bg-blue-800 
                             transition-colors duration-200 focus:outline-none focus:ring-2 
                             focus:ring-blue-900 focus:ring-offset-2"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;