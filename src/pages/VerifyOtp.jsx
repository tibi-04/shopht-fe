import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }


    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);


      if (index < 5 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
  
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^[0-9]+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);


      const focusIndex = Math.min(5, pastedData.length - 1);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/quen-mat-khau", {
        email,
      });

      if (res.data.success) {
        toast.success("Mã OTP mới đã được gửi!");
        setTimeLeft(60);
        setCanResend(false);

    
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setCanResend(true);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      } else {
        toast.error(res.data.message || "Không thể gửi lại OTP!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ 6 chữ số OTP");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/xac-thuc-otp", {
        email,
        otp: otpValue,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Xác thực OTP thành công!");
        setTimeout(() => {
          navigate("/dat-lai-mat-khau", { state: { email, otp: otpValue } });
        }, 1500);
      } else {
        toast.error(res.data.message || "Mã OTP không chính xác!");
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Xác thực OTP
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Nhập mã xác thực đã gửi đến {email}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-[#A12B58] focus:border-transparent transition hover:border-[#A12B58]"
              />
            ))}
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
                Đang xác thực...
              </div>
            ) : (
              "Xác nhận"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="text-[#A12B58] font-semibold hover:underline transition"
            >
              Gửi lại mã OTP
            </button>
          ) : (
            <p className="text-sm text-gray-600">
              Gửi lại mã sau:{" "}
              <span className="font-semibold text-[#A12B58]">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </p>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
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

export default VerifyOtp;
