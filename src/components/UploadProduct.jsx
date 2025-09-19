import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

export const UploadProduct = ({ onClose, fetchdata }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

 
  const [moreDetails, setMoreDetails] = useState([{ key: "", value: "" }]);


  const handleMoreDetailsChange = (index, field, value) => {
    setMoreDetails((prev) => {
      const newDetails = [...prev];
      newDetails[index][field] = value;
      return newDetails;
    });
  };

  const handleAddMoreDetail = () => {
    setMoreDetails((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveMoreDetail = (index) => {
    setMoreDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    console.log("Cloudinary:", uploadImageCloudinary);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeteleProductImage = async (index) => {
    console.log("Delete Image Index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.productImage.length === 0) {
        toast.error("Vui lòng tải lên ít nhất một hình ảnh sản phẩm");
        return;
      }

      const token = localStorage.getItem("token") || "";
      const fixedData = {
        ...data,
        price: Number(data.price),
        sellingPrice: Number(data.sellingPrice),
        more_details: moreDetails.filter((md) => md.key.trim() !== ""), 
      };

      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fixedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          toast.error("Bạn cần quyền Quản Trị Viên để thực hiện chức năng này");
          return;
        }
        throw new Error(responseData.message || "Lỗi khi tải sản phẩm lên");
      }

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchdata();
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      toast.error(err.message || "Đã xảy ra lỗi khi tải sản phẩm lên");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden">
   
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Thêm sản phẩm</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-[#A12B58] transition-colors"
          >
            <CgClose />
          </button>
        </div>

    
        <form
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          onSubmit={handleSubmit}
        >

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58] focus:border-transparent transition-all placeholder-gray-400"
              required
            />
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Thương hiệu
              </label>
              <input
                type="text"
                placeholder="Nhập thương hiệu"
                name="brandName"
                value={data.brandName}
                onChange={handleOnChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58] focus:border-transparent transition-all placeholder-gray-400"
                required
              />
            </div>

    
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Loại sản phẩm <span className="text-red-500">*</span>
              </label>
              <select
                value={data.category}
                name="category"
                onChange={handleOnChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58] focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="">Chọn loại sản phẩm</option>
                {productCategory.map((el, index) => {
                  return (
                    <option value={el.value} key={el.value + index}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

         
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Hình ảnh sản phẩm <span className="text-red-500">*</span>
            </label>
            <label htmlFor="uploadImageInput" className="cursor-pointer">
              <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center text-center hover:border-[#A12B58] transition-colors group">
                <div className="text-gray-400 group-hover:text-[#A12B58] transition-colors">
                  <FaCloudUploadAlt size={48} className="mx-auto mb-3" />
                  <p className="font-medium text-gray-600 group-hover:text-[#A12B58]">
                    Kéo thả hoặc click để tải ảnh lên
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (JPEG, PNG, WEBP tối đa 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  accept="image/jpeg, image/png, image/webp"
                  required={data.productImage.length === 0}
                />
              </div>
            </label>

        
            <div className="mt-4">
              {data?.productImage[0] ? (
                <div className="flex flex-wrap gap-4">
                  {data.productImage.map((el, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={el}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 hover:border-[#A12B58] transition-colors cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeteleProductImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 text-sm mt-2">
                  *Vui lòng tải lên ít nhất một hình ảnh sản phẩm
                </p>
              )}
            </div>
          </div>

  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Giá gốc <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₫
                </span>
                <input
                  type="number"
                  placeholder="0"
                  name="price"
                  value={data.price}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58] focus:border-transparent transition-all"
                  required
                  min="0"
                />
              </div>
            </div>

    
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Giá bán <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₫
                </span>
                <input
                  type="number"
                  placeholder="0"
                  name="sellingPrice"
                  value={data.sellingPrice}
                  onChange={handleOnChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58] focus:border-transparent transition-all"
                  required
                  min="0"
                />
              </div>
            </div>
          </div>

       
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ">
              Mô tả sản phẩm
            </label>
            <textarea
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A12B58] focus:border-transparent transition-all placeholder-gray-400 min-h-[120px] resize-none"
              placeholder="Nhập mô tả chi tiết về sản phẩm..."
              name="description"
              value={data.description}
              onChange={handleOnChange}
            ></textarea>
          </div>

        
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Thông số thêm
            </label>

            {moreDetails.map((detail, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Tên thông số"
                  value={detail.key}
                  onChange={(e) =>
                    handleMoreDetailsChange(index, "key", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Nội dung"
                  value={detail.value}
                  onChange={(e) =>
                    handleMoreDetailsChange(index, "value", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMoreDetail(index)}
                  className="text-red-500 font-bold px-2"
                  disabled={moreDetails.length === 1} 
                >
                  Xóa
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddMoreDetail}
              className="px-4 py-2 bg-[#A12B58] text-white rounded hover:bg-[#8a2450] transition"
            >
              Thêm thông số
            </button>
          </div>
      
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#A12B58] to-[#8a2450] text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Xác nhận thêm sản phẩm
            </button>
          </div>
        </form>
      </div>

   
      {openFullScreenImage && fullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onclose={() => {
            setOpenFullScreenImage(false);
            setFullScreenImage("");
          }}
        />
      )}
    </div>
  );
};
