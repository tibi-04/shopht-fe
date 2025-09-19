import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { AdminEditProduct } from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify"; 
export const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: data._id }), 
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Xóa sản phẩm thất bại");
      }

      toast.success("Đã xóa sản phẩm");
      fetchdata(); 
    } catch (error) {
      toast.error(error.message || "Lỗi khi xóa sản phẩm");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">

      <div className="relative aspect-square overflow-hidden">
        {data?.productImage?.[0] && (
          <img
            src={data.productImage[0]}
            alt={data.productName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
   
        <div className="absolute bottom-0 right-2 flex gap-2">
 
          <button
            onClick={() => setEditProduct(true)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
            aria-label="Edit product"
          >
            <MdModeEditOutline className="text-lg" />
          </button>

  
          <button
            onClick={handleDeleteProduct}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors duration-200"
            aria-label="Delete product"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>


      <div className="p-4 space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 h-12">
          {data.productName}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">
            {displayVNDCurrency(data.sellingPrice)}
          </span>
          {data.stock && (
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                data.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {data.stock > 0 ? `${data.stock} in stock` : "Out of stock"}
            </span>
          )}
        </div>
      </div>

 
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};
