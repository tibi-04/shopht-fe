import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

export const Home = () => {
  return (
    <div className="w-full">
      <BannerProduct />
    <div className="p-4"> 
      <CategoryList />
      </div>

      <HorizontalCardProduct category={"Tai nghe"} heading={"Tai nghe"} />
      <HorizontalCardProduct category={"Đồng hồ"} heading={"Đồng hồ"} />

      <VerticalCardProduct category={"Điện thoại"} heading={"Điện thoại"} />
      <VerticalCardProduct category={"Màn hình"} heading={"Màn hình"} />
      <VerticalCardProduct category={"Laptop"} heading={"Laptop"} />
      <VerticalCardProduct category={"Loa"} heading={"Loa"} />
      <VerticalCardProduct category={"Chuột"} heading={"Chuột"} />
      <VerticalCardProduct category={"Bàn phím"} heading={"Bàn phím"} />
      <VerticalCardProduct category={"Máy in"} heading={"Máy in"} />
      <VerticalCardProduct category={"Camera"} heading={"Camera"} />
      <VerticalCardProduct category={"Tivi"} heading={"Tivi"} />
      <VerticalCardProduct category={"Phụ kiện"} heading={"Phụ kiện"} /> 
    </div>
  )
}

export default Home
