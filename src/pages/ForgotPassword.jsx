import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/quen-mat-khau", {
        email,
      });

      if (res.data.success) {

        toast.success("Mã OTP đã được gửi tới email của bạn.");
        setTimeout(() => {
          navigate("/xac-thuc-otp", { state: { email } });
        }, 2000);
      } else {
  
        toast.error(res.data.message || "Không thể gửi, email không tồn tại!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-[2vh]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-[#A12B58]/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#A12B58]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Quên mật khẩu
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Nhập email để nhận mã OTP
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full pr-4 pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A12B58] focus:border-[#A12B58] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#A12B58] to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-md"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang gửi OTP...
              </div>
            ) : (
              "Gửi mã OTP"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <Link
            to="/dang-nhap"
            className="text-[#A12B58] font-semibold hover:underline transition"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
