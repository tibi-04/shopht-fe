import React from 'react'
import SUCCESSIMAGE from '../assest/success_ht.gif'
import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

const Success = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='bg-white w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 rounded-xl shadow-lg text-center'>
        <div className='relative mb-6'>
          <img 
            src={SUCCESSIMAGE} 
            width={180} 
            height={180} 
            alt="Payment successful" 
            className='mx-auto'
          />
          {/* <div className='absolute -bottom-2 -right-2 bg-[#a12b58] p-2 rounded-full'>
            <FiCheckCircle className='text-white text-2xl' />
          </div> */}
        </div>
        
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Thanh toán thành công!</h1>
        <p className='text-gray-600 mb-6'>Đơn hàng của bạn đã được xử lý thành công.</p>
        
        <Link 
          to={"/danh-sach-don-hang"} 
          className='w-full bg-[#a12b58] hover:bg-[#8a2449] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2'
        >
          Xem đơn hàng
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>

        {/* <p className='text-sm text-gray-500 mt-4'>
          Bạn sẽ nhận được email xác nhận đơn hàng trong ít phút.
        </p> */}
      </div>
    </div>
  )
}

export default Success