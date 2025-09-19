import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import { SignUp } from "../pages/SignUp";
import { AdminPanel } from "../pages/AdminPanel";
import { AllUsers } from "../pages/AllUsers";
import { AllProducts } from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import ResetPassword from "../pages/ResetPassword";
import VerifyOtp from "../pages/VerifyOtp";
import RevenueChart from "../components/RevenueChart";
import MyAccount from "../components/MyAccount";
import PromotionPage from "../pages/PromotionPage";
import ContactPage from "../pages/ContactPage";
import NewsPage from "../pages/NewsPage";
import IntroducePage from "../pages/IntroducePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dang-nhap",
        element: <Login />,
      },
      {
        path: "quen-mat-khau",
        element: <ForgotPassword />,
      },
      {
        path: "dang-ky",
        element: <SignUp />,
      },
      {
        path: "loai-san-pham/",
        element: <CategoryProduct />,
      },
      {
        path: "chi-tiet-san-pham/:id",
        element: <ProductDetails />,
        errorElement: <p>Sản phẩm không tồn tại.</p>,
      },
      {
        path: "gio-hang",
        element: <Cart />,
      },
      {
        path: "thanh-toan-thanh-cong",
        element: <Success />,
      },
      {
        path: "thanh-toan-that-bai",
        element: <Cancel />,
      },
      {
        path: "tim-kiem-san-pham",
        element: <SearchProduct />,
      },
      {
        path: "danh-sach-don-hang",
        element: <OrderPage />,
      },
      {
        path: "trang-quan-tri",
        element: <AdminPanel />,
        children: [
          {
            path: "bieu-do-doanh-thu",
            element: <RevenueChart />,
          },
          {
            path: "tat-ca-nguoi-dung",
            element: <AllUsers />,
          },
          {
            path: "tat-ca-san-pham",
            element: <AllProducts />,
          },
        ],
      },
      {
        path: "dat-lai-mat-khau",
        element: <ResetPassword />,
      },
      {
        path: "xac-thuc-otp",
        element: <VerifyOtp />,
      },
      {
        path: "tai-khoan",
        element: <MyAccount />,
      },
      {
        path: "khuyen-mai",
        element: <PromotionPage />,
      },
      {
        path: "gioi-thieu",
        element: <IntroducePage />,
      },
      {
        path: "tin-tuc",
        element: <NewsPage />,
      },
      {
        path: "lien-he",
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
