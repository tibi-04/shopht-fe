import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("Query", query.search)

    const fetchProduct = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)

        console.log("DataResponse", dataResponse)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    return (
        <div className='container mx-auto p-4 min-h-screen'>
     
            {loading && (
                <div className='flex justify-center items-center py-8'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                    <p className='ml-4 text-lg text-gray-600'>Đang tải...</p>
                </div>
            )}


            <div className='bg-white p-4 rounded-lg shadow mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>Kết quả tìm kiếm</h1>
                <p className='text-gray-600 mt-1'>Tìm thấy {data.length} sản phẩm phù hợp</p>
            </div>


            {data.length === 0 && !loading && (
                <div className='bg-white rounded-lg shadow p-8 text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className='text-xl font-medium text-gray-700 mt-4'>Không tìm thấy sản phẩm nào</p>
                    <p className='text-gray-500'>Xin vui lòng thử với từ khóa khác</p>
                </div>
            )}

 
            {data.length !== 0 && !loading && (
                <div className='bg-white p-4 rounded-lg shadow'>
                    <VerticalCard loading={loading} data={data} />
                </div>
            )}
        </div>
    )
}

export default SearchProduct