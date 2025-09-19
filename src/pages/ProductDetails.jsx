import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import {
  FaStar,
  FaStarHalf,
  FaShoppingCart,
  FaBolt,
  FaShippingFast,
  FaShieldAlt,
  FaExchangeAlt,
  FaBoxOpen,
} from "react-icons/fa";
import displayVNDCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    more_details: [],
  });

  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId: params?.id }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setData(dataResponse.data);
        setActiveImage(dataResponse.data.productImage?.[0] || "");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) fetchProductDetails();
  }, [params?.id]);

  const handleMouseEnterProduct = (img) => setActiveImage(img);

  const handleZoomImage = useCallback((e) => {
    const element = e.currentTarget;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomImageCoordinate({ x, y });
    setZoomImage(true);
  }, []);

  const handleMouseLeaveZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/gio-hang");
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        <div className="w-full lg:w-1/2 relative">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4 border">
            {activeImage && (
              <div
                className="relative h-64 xs:h-72 sm:h-80 md:h-96 overflow-hidden cursor-zoom-in"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleMouseLeaveZoom}
              >
                <img
                  src={activeImage}
                  alt="product"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
            {(loading ? new Array(4).fill(null) : data.productImage).map(
              (img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0 p-1 border-2 cursor-pointer transition-all ${
                    activeImage === img ? "border-[#A12B58]" : "border-gray-200"
                  }`}
                  onClick={() => !loading && handleMouseEnterProduct(img)}
                >
                  {!loading ? (
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
                  )}
                </div>
              )
            )}
          </div>

          {zoomImage && (
            <div className="hidden lg:block absolute top-0 right-0 transform translate-x-full ml-6 w-80 h-80 border border-gray-300 bg-white rounded-xl overflow-hidden shadow-2xl z-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`,
                  backgroundSize: "200%",
                }}
              ></div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5">
          {loading ? (
            <>
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </>
          ) : (
            <>
              <span className="bg-[#FEE2E2] text-[#A12B58] px-3 py-1 rounded-full text-sm w-fit">
                {data.brandName}
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {data.productName}
              </h1>

              <p className="text-gray-500 text-sm sm:text-base capitalize">
                {data.category}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 text-base">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>
                <span className="text-gray-500 text-sm">(0 đánh giá)</span>
              </div>

              <div className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold my-2">
                <span className="text-[#A12B58]">
                  {displayVNDCurrency(data.sellingPrice)}
                </span>
                <span className="text-gray-400 line-through text-lg sm:text-xl">
                  {displayVNDCurrency(data.price)}
                </span>
                {data.sellingPrice < data.price && (
                  <span className="bg-[#A12B58] text-white text-sm px-3 py-1 rounded-full">
                    -{Math.round((1 - data.sellingPrice / data.price) * 100)}%
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={(e) => handleBuyProduct(e, params.id)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#A12B58] text-white font-medium rounded-lg hover:bg-[#8a1f4a] transition flex-1 text-base"
                >
                  <FaBolt className="text-sm" />
                  Mua ngay
                </button>
                <button
                  onClick={(e) => handleAddToCart(e, params.id)}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#A12B58] text-[#A12B58] font-medium rounded-lg hover:bg-[#A12B58] hover:text-white transition flex-1 text-base"
                >
                  <FaShoppingCart className="text-sm" />
                  Thêm vào giỏ
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mt-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FaShippingFast className="text-[#A12B58] text-lg" />
                    <div>
                      <div className="text-gray-500">Vận chuyển</div>
                      <div className="text-[#A12B58] font-medium">100.000đ</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBoxOpen className="text-[#A12B58] text-lg" />
                    <div>
                      <div className="text-gray-500">Tồn kho</div>
                      <div className="text-[#A12B58] font-medium">Còn hàng</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-[#A12B58] text-lg" />
                    <div>
                      <div className="text-gray-500">Bảo hành</div>
                      <div className="text-[#A12B58] font-medium">12 tháng</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaExchangeAlt className="text-[#A12B58] text-lg" />
                    <div>
                      <div className="text-gray-500">Đổi trả</div>
                      <div className="text-[#A12B58] font-medium">7 ngày</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Mô tả sản phẩm
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {data.description || "Không có mô tả"}
                </p>
              </div>

              {data.more_details?.length > 0 && (
                <div className="mt-6 w-full">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">
                    Thông số chi tiết
                  </h2>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full text-xs sm:text-sm md:text-base">
                      <tbody>
                        {data.more_details.map((detail, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-200 even:bg-gray-50"
                          >
                            <td className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 font-medium text-gray-700 w-1/3 sm:w-2/5">
                              {detail.key}
                            </td>
                            <td className="px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 text-gray-600">
                              {detail.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {data.category && (
        <div className="mt-12">
          <CategoryWiseProductDisplay
            category={data.category}
            heading="Sản phẩm tương tự"
            limit={10}
          />
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
