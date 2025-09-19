import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onclose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
 
        <button
          onClick={onclose}
          className="absolute top-3 right-3 z-10 p-1 text-3xl text-gray-400 hover:text-primary transition-colors"
          aria-label="Đóng ảnh"
        >
          <CgClose />
        </button>

 
        <div className="relative w-[80vw] h-[80vw] max-w-[750px] max-h-[750px] flex items-center justify-center">
          <img
            src={imgUrl}
            alt="Ảnh sản phẩm"
            className="absolute inset-0 w-full h-full object-contain p-4"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;