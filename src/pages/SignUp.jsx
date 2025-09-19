import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin_avt.gif";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import imgbase64 from "../helpers/imgbase64";
import { useDispatch } from "react-redux";
import { setTempProfilePic } from "../store/userSlice";
export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imagePic = await imgbase64(file);
    console.log("Base64 Image:", imagePic);
    setData((prev) => ({ ...prev, profilePic: imagePic }));
    const tempUrl = URL.createObjectURL(file);
    dispatch(setTempProfilePic(tempUrl));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/dang-nhap");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      console.log("Please check password and confirm password");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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
                src={data.profilePic || loginIcons}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />{" "}
            </div>{" "}
            <form>
              {" "}
              <label className="cursor-pointer">
                {" "}
                <div
                  className="absolute bottom-0 left-0 w-full h-8 flex items-center justify-center text-xs text-center text-black bg-slate-200 bg-opacity-50"
                  style={{ clipPath: "ellipse(100% 100% at 50% 0%)" }}
                >
                  {" "}
                  Tải ảnh lên{" "}
                </div>{" "}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                  accept="image/*"
                />{" "}
              </label>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {" "}
          <div>
            {" "}
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Họ và tên{" "}
            </label>{" "}
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleOnChange}
              value={data.name}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A12B58] focus:border-[#A12B58] outline-none"
              placeholder="Nhập họ và tên"
            />{" "}
          </div>{" "}
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
          <div className="relative">
            {" "}
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Xác nhận mật khẩu{" "}
            </label>{" "}
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleOnChange}
              value={data.confirmPassword}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A12B58] focus:border-[#A12B58] outline-none pr-10"
              placeholder="Nhập lại mật khẩu"
            />{" "}
            <button
              type="button"
              className="absolute right-2 top-8 p-1"
              onClick={toggleConfirmPasswordVisibility}
            >
              {" "}
              {showConfirmPassword ? (
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
          <div>
            {" "}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A12B58] hover:bg-[#A12B58]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A12B58] transition-colors"
            >
              {" "}
              Đăng ký{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
        <p className="mt-4 text-center text-sm text-gray-600">
          {" "}
          Bạn đã có tài khoản?{" "}
          <Link
            to="/dang-nhap"
            className="font-medium text-[#A12B58] hover:text-[#A12B58]/80 hover:underline"
          >
            {" "}
            Đăng nhập{" "}
          </Link>{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default SignUp;
