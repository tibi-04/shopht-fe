import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const loadingList = new Array(4).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const displayData = showAll ? data : data.slice(0, 8);
  const hasMoreProducts = data.length > 8;

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-2xl font-bold text-[#a12b58] mb-6 text-center md:text-left">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full h-52 bg-white rounded-xl shadow-md flex overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer"></div>
                <div className="bg-gray-200 h-full w-2/5 z-10"></div>
                <div className="p-4 w-3/5 grid gap-2 z-10">
                  <div className="h-5 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-5 bg-gray-200 rounded-full w-1/2"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-1/2"></div>
                  </div>
                  <div className="h-9 bg-gray-200 rounded-full mt-4"></div>
                </div>
              </div>
            ))
          : displayData.map((product) => (
              <Link
                key={product._id}
                to={`/chi-tiet-san-pham/${product._id}`}
                className="w-full h-52 bg-white rounded-xl shadow-md flex overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-full w-2/5 flex items-center p-1">
                  <img
                    src={product.productImage[0]}
                    className="object-contain h-full w-full rounded-l-xl"
                    alt={product.productName}
                  />
                </div>
                <div className="p-4 w-3/5 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-800 text-lg text-ellipsis line-clamp-2">
                      {product?.productName}
                    </h2>
                    <p className="text-sm text-gray-500 capitalize mt-1">
                      {product?.category}
                    </p>
                  </div>
                  <div>
                    <div className="mt-2">
                      <p className="text-xl font-bold text-[#a12b58]">
                        {displayVNDCurrency(product?.sellingPrice)}
                      </p>
                      {product?.price > product?.sellingPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          {displayVNDCurrency(product?.price)}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full mt-4 bg-[#a12b58] hover:bg-[#8a2449] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      {!loading && hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-white border border-[#a12b58] text-[#a12b58] hover:bg-[#a12b58] hover:text-white py-2 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Thu gọn
              </>
            ) : (
              <>
                Xem thêm
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default HorizontalCardProduct;
