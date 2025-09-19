import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayVNDCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount || 3).fill(null);

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    const handleLoading = async() => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, []);

    const increaseQty = async(id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty + 1
            })
        })
        const responseData = await response.json()
        if(responseData.success) {
            fetchData()
        }
    }

    const decraseQty = async(id, qty) => {
        if(qty > 1) {
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify({
                    _id : id,
                    quantity : qty - 1
                })
            })
            const responseData = await response.json()
            if(responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                _id : id,
            })
        })
        const responseData = await response.json()
        if(responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const handlePayment = async() => {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                cartItems : data
            })
        })
        const responseData = await response.json()
        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id });
        }
    }

    const totalQty = data.reduce((previousValue,currentValue) => previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * (curr.productId?.sellingPrice || 0)), 0);

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-[#a12b58] mb-8 flex items-center gap-2'>
                Giỏ hàng của bạn
            </h1>

            {data.length === 0 && !loading && (
                <div className='bg-white rounded-lg shadow-md p-8 text-center'>
                    <div className='text-gray-400 mb-4'>
                        <FiShoppingBag className='text-5xl mx-auto' />
                    </div>
                    <h2 className='text-xl font-semibold text-gray-700 mb-2'>Giỏ hàng trống</h2>
                    <p className='text-gray-500 mb-4'>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <a 
                        href='/'
                        className='inline-block bg-[#a12b58] hover:bg-[#8a2449] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300'
                    >
                        Tiếp tục mua sắm
                    </a>
                </div>
            )}

            <div className='flex flex-col lg:flex-row gap-8'>

                <div className='w-full lg:w-2/3'>
                    {loading ? (
                        loadingCart.map((_, i) => (
                            <div key={i} className='w-full bg-gray-100 h-32 my-3 rounded-lg animate-pulse'></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product?._id} className='flex gap-4 items-center w-full bg-white my-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4'>
                                <div className='w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center'>
                                    <img
                                        src={product?.productId?.productImage?.[0]}
                                        alt={product?.productId?.productName}
                                        className='w-full h-full object-contain p-2'
                                    />
                                </div>
                                <div className='flex-grow relative'>
                                    <button 
                                        className='absolute top-0 right-0 text-gray-400 hover:text-[#a12b58] transition-colors duration-200'
                                        onClick={() => deleteCartProduct(product?._id)}
                                    >
                                        <MdDelete className='text-xl' />
                                    </button>
                                    <h2 className='text-lg font-semibold text-gray-800 line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='text-sm text-gray-500 capitalize mb-2'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-lg font-bold text-[#a12b58]'>{displayVNDCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-lg font-semibold text-gray-800'>{displayVNDCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-2'>
                                        <button 
                                            className='border border-[#a12b58] text-[#a12b58] hover:bg-[#a12b58] hover:text-white w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200'
                                            onClick={() => decraseQty(product?._id, product.quantity)}
                                        >
                                            -
                                        </button>
                                        <span className='font-medium'>{product?.quantity}</span>
                                        <button 
                                            className='border border-[#a12b58] text-[#a12b58] hover:bg-[#a12b58] hover:text-white w-8 h-8 flex justify-center items-center rounded-full transition-colors duration-200'
                                            onClick={() => increaseQty(product?._id, product.quantity)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

     
                {data[0] && (
                    <div className='w-full lg:w-1/3'>
                        <div className='bg-white rounded-lg shadow-md p-6 sticky top-4'>
                            <h2 className='text-xl font-bold text-[#a12b58] border-b pb-3 mb-4'>Tóm tắt đơn hàng</h2>
                            <div className='space-y-4 mb-6'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Số lượng sản phẩm</span>
                                    <span className='font-medium'>{totalQty}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Tạm tính</span>
                                    <span className='font-medium'>{displayVNDCurrency(totalPrice)}</span>
                                </div>
                                <div className='flex justify-between border-t pt-3'>
                                    <span className='font-semibold'>Tổng cộng</span>
                                    <span className='text-xl font-bold text-[#a12b58]'>{displayVNDCurrency(totalPrice)}</span>
                                </div>
                            </div>
                            <button 
                                className='w-full bg-[#a12b58] hover:bg-[#8a2449] text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md'
                                onClick={handlePayment}
                            >
                                Thanh toán ngay
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;