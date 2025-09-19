import React, { useEffect, useState, useMemo } from "react";
import { UploadProduct } from "../components/UploadProduct";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { AdminProductCard } from "../components/AdminProductCard";
import { FiPlusCircle, FiSearch, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 12;

  const fetchAllProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.allProduct.url, {
        credentials: 'include'
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);


  const filteredProducts = useMemo(() => {
    if (!searchQuery) return allProduct;
    
    return allProduct.filter(product => 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProduct, searchQuery]);


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [currentPage, filteredProducts]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">

      <div className="bg-white py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center shadow-md sticky top-0 z-10 gap-4">
        <h2 className="font-bold text-xl md:text-2xl text-[#A12B58]">Quản lý sản phẩm</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
    
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#A12B58]"
              >
                <FiX className="text-lg" />
              </button>
            )}
          </div>
          
      
          <button
            className="flex items-center justify-center gap-2 bg-[#A12B58] hover:bg-[#8a2449] text-white py-2 px-4 rounded-lg transition-colors duration-300 shadow-md whitespace-nowrap"
            onClick={() => setOpenUploadProduct(true)}
          >
            <FiPlusCircle className="text-lg" />
            <span className="hidden sm:inline">Thêm sản phẩm</span>
            <span className="sm:hidden">Thêm</span>
          </button>
        </div>
      </div>


      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-60 md:h-72 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                <div className="flex justify-between mt-4">
                  <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>

          <div className="px-4 md:px-6 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-gray-600 text-sm md:text-base">
              Hiển thị <span className="font-semibold text-[#A12B58]">{currentProducts.length}</span> của{" "}
              <span className="font-semibold text-[#A12B58]">{filteredProducts.length}</span> sản phẩm
              {searchQuery && ` cho từ khóa "${searchQuery}"`}
            </p>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-gray-600">Trang:</span>
                <span className="font-semibold text-[#A12B58]">{currentPage}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{totalPages}</span>
              </div>
            )}
          </div>

  
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
                {currentProducts.map((product, index) => (
                  <AdminProductCard 
                    data={product} 
                    key={`${product._id}-${index}`} 
                    fetchdata={fetchAllProduct}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                ))}
              </div>


              {totalPages > 1 && (
                <div className="flex justify-center mt-6 px-4">
                  <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#A12B58] hover:bg-gray-100'}`}
                    >
                      <FiChevronLeft className="text-xl" />
                    </button>

           
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-md text-sm font-medium ${currentPage === page ? 'bg-[#A12B58] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#A12B58] hover:bg-gray-100'}`}
                    >
                      <FiChevronRight className="text-xl" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <FiSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchQuery ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? "Hãy thử tìm kiếm với từ khóa khác" : "Bấm vào nút 'Thêm sản phẩm' để bắt đầu"}
              </p>
              <button
                className="bg-[#A12B58] hover:bg-[#8a2449] text-white py-2 px-6 rounded-lg transition-colors duration-300"
                onClick={() => {
                  if (searchQuery) {
                    clearSearch();
                  } else {
                    setOpenUploadProduct(true);
                  }
                }}
              >
                {searchQuery ? "Xóa tìm kiếm" : "Thêm sản phẩm đầu tiên"}
              </button>
            </div>
          )}
        </>
      )}


      {openUploadProduct && (
        <UploadProduct 
          onClose={() => {
            setOpenUploadProduct(false);
            fetchAllProduct();
          }} 
          fetchdata={fetchAllProduct}
        />
      )}
    </div>
  );
};