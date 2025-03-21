import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { addProduct } from '../Store/Features/cartSlice';

const Details = () => {
  const items = useSelector(state => state.item.data);
  const dispatch=useDispatch()
  const { id } = useParams();
  const product = items.filter((item) => item._id === id);

  const [checkoutProduct, setCheckoutProduct] = useState({
    id: product[0]._id,
    name: product[0].itemName,
    price: product[0].unitPrice,
    image:product[0].productImages[0],
    quantity:1,
    availableQuantity:product[0].availableQuantity,

  });

  const increment = () => {
    if (checkoutProduct.quantity < product[0].availableQuantity) {
      setCheckoutProduct((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
      }));
    }
  };

  const decrement = () => {
    if (checkoutProduct.quantity > 1) {
      setCheckoutProduct((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }));
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct(checkoutProduct))

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

                <div className="space-y-4 flex flex-col">
                 <button className='bg-green-500 px-3 py-5 rounded-md text-white font-semibold hover:bg-green-600'>
                  Get Product
                 </button>
                  <button
                    onClick={handleAddToCart}
                    className="py-4 px-6 bg-blue-900 text-white rounded-lg font-semibold
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