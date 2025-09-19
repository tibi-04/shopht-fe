import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import srcollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading, limit }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    const products = limit
      ? categoryProduct?.data.slice(0, limit)
      : categoryProduct?.data;
    setData(products || []);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [category, limit]);

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-3xl font-bold py-6 text-[#a12b58] border-b-2 border-[#a12b58]/20">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-4">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="bg-gray-100 h-60 p-4 flex justify-center items-center animate-pulse"></div>
                  <div className="p-5 grid gap-3">
                    <h2 className="font-medium text-lg text-ellipsis line-clamp-1 p-2 py-3 animate-pulse rounded bg-gray-200"></h2>
                    <p className="capitalize p-2 animate-pulse rounded bg-gray-200 py-3"></p>
                    <div className="flex gap-3">
                      <p className="w-1/2 p-2 animate-pulse rounded bg-gray-200 py-3"></p>
                      <p className="w-1/2 p-2 animate-pulse rounded bg-gray-200 py-3"></p>
                    </div>
                    <button className="text-sm p-3 animate-pulse rounded bg-gray-200"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  key={product._id}
                  to={`/chi-tiet-san-pham/${product._id}`}
                  className="w-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                  onClick={srcollTop}
                >
                  <div className="bg-gray-100 h-60 p-4 flex justify-center items-center">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-105 transition-all duration-300 mix-blend-multiply"
                      alt={product?.productName}
                    />
                  </div>
                  <div className="p-5 grid gap-3">
                    <h2 className="font-semibold text-lg text-gray-800 text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-gray-500 text-sm">
                      {product?.category}
                    </p>
                    <div className="flex gap-3 items-center">
                      <p className="text-[#a12b58] font-bold text-lg">
                        {displayVNDCurrency(product?.sellingPrice)}
                      </p>
                      {product?.price > product?.sellingPrice && (
                        <p className="text-gray-400 text-sm line-through">
                          {displayVNDCurrency(product?.price)}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full bg-[#a12b58] hover:bg-[#8a2449] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
