import React from 'react'
import CANCELIMAGE from '../assest/failed_ht.gif'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden text-center p-6">
        <div className="flex justify-center mb-6">
          <img 
            src={CANCELIMAGE} 
            alt="Thanh toán thất bại" 
            className="w-40 h-40 object-contain"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Thanh toán không thành công
        </h2>
        <p className="text-gray-600 mb-6">
          Đơn hàng của bạn đã bị hủy hoặc thanh toán không thành công. Vui lòng thử lại.
        </p>

        <Link 
          to="/gio-hang" 
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          <MdOutlineShoppingCart className="text-lg" />
          Quay lại giỏ hàng
        </Link>

        <div className="mt-6 text-sm text-gray-500">
          <p>Cần hỗ trợ? Liên hệ chúng tôi tại:</p>
          <a href="htshop@gmail.com" className="text-blue-600 hover:underline">
            htshop@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default Cancel