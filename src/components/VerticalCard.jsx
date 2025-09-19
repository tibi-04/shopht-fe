import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayVNDCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(8).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={`loading-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 h-60 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                <div className="flex gap-3">
                  <div className="h-5 bg-gray-200 rounded-full w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              to={`/chi-tiet-san-pham/${product._id}`}
              key={product?._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onClick={scrollTop}
            >
              <div className="bg-gray-100 h-60 p-4 flex justify-center items-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="object-contain h-full w-full hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-3">
                <h2 className="font-medium text-lg text-gray-900 line-clamp-2 h-14">
                  {product?.productName}
                </h2>
                <p className="text-gray-500 text-sm capitalize">
                  {product?.category}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-red-600 font-semibold">
                    {displayVNDCurrency(product?.sellingPrice)}
                  </p>
                  {product?.price > product?.sellingPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      {displayVNDCurrency(product?.price)}
                    </p>
                  )}
                </div>
                <button
                  className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
