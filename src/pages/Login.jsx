import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin_avt.gif";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return { ...preve, [name]: value };
    });
  };
  const handSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log("Test Login - BHT", data);
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-start justify-center pt-[2vh]">
      {" "}
      <div className="relative z-10 w-full max-w-md px-6 py-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl">
        {" "}
        <div className="text-center mb-8 mx-auto">
          {" "}
          <div className="relative overflow-hidden w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#A12B58]/10 to-[#fce8ef] p-1 border border-[#A12B58]/20 shadow-sm">
            {" "}
            <div className="w-full h-full rounded-full overflow-hidden">
              {" "}
              <img
                src={loginIcons}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <form className="space-y-6" onSubmit={handSubmit}>
          {" "}
          <div>
            {" "}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Email{" "}
            </label>{" "}
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleOnChange}
              value={data.email}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A12B58] focus:border-[#A12B58] outline-none"
              placeholder="Nhập email"
            />{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Mật khẩu{" "}
            </label>{" "}
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              onChange={handleOnChange}
              value={data.password}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A12B58] focus:border-[#A12B58] outline-none pr-10"
              placeholder="Nhập mật khẩu"
            />{" "}
            <button
              type="button"
              className="absolute right-2 top-8 p-1"
              onClick={togglePasswordVisibility}
            >
              {" "}
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />{" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />{" "}
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />{" "}
                </svg>
              )}{" "}
            </button>{" "}
          </div>{" "}
          <div className="flex items-center justify-between">
            {" "}
            <div className="flex items-center"></div>{" "}
            <div className="text-sm">
              {" "}
              <Link
                to={"/quen-mat-khau"}
                className="font-medium text-[#A12B58] hover:text-[#A12B58]/80"
              >
                {" "}
                Quên mật khẩu?{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A12B58] hover:bg-[#A12B58]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A12B58]"
            >
              {" "}
              Đăng nhập{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
        <p className="my-5">
          {" "}
          Bạn chưa có tài khoản?{" "}
          <Link
            to={"/dang-ky"}
            className="text-[#A12B58] hover:text-[#A12B58]/80 hover:underline"
          >
            {" "}
            Đăng ký{" "}
          </Link>{" "}
        </p>{" "}
        <div className="mt-6">
          {" "}
          <div className="relative">
            {" "}
            <div className="absolute inset-0 flex items-center">
              {" "}
              <div className="w-full"></div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Login;
