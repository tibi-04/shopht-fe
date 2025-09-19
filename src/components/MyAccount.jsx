import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common"; 
import OrderChart from "./OrderChart";
import { setUserDetails, setAvatarUpdated } from "../store/userSlice";
import { useDispatch } from "react-redux";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const backendDomin = process.env.REACT_APP_API_URL || "http://localhost:8080/api";


  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendDomin}/user-details`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUser(data.data);
        dispatch(setUserDetails(data.data));
      } else {
        toast.error(data.message || "Không thể tải thông tin người dùng");
        setUser(null);
      }
    } catch (error) {
      toast.error("Lỗi khi tải thông tin người dùng");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarFile(file);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      toast.warn("Vui lòng chọn ảnh để cập nhật");
      return;
    }

    setUploading(true);
    try {
      const base64Image = await fileToBase64(avatarFile);

      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          profilePic: base64Image,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Cập nhật avatar thành công");
        await fetchUserDetails();
        dispatch(setAvatarUpdated(true));
        setAvatarFile(null);
      } else {
        toast.error(data.message || "Cập nhật avatar thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật avatar");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        Đang tải thông tin tài khoản...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <p>Bạn chưa đăng nhập hoặc không có thông tin người dùng.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#a12b58] text-center">
        Thông Tin Tài Khoản Của Tôi
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="lg:w-1/3 w-full bg-white p-5 sm:p-6 rounded-lg shadow-md border-t-4 border-[#a12b58]">
          <div className="flex flex-col sm:flex-row items-center mb-4 gap-4">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#a12b58]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
            )}
            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold text-[#a12b58]">
                {user.name || "Chưa cập nhật tên"}
              </p>
              <p className="text-gray-600 break-all">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                HT - Shop:{" "}
                <span className="text-[#a12b58] font-medium">
                  {user.role || "Người Dùng"}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Cập nhật ảnh đại diện
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

              <button
                onClick={() => document.getElementById("avatarInput").click()}
                className="px-4 py-2 bg-[#a12b58] text-white rounded hover:bg-[#8c2048] transition"
                disabled={uploading}
              >
                {uploading ? "Đang tải ảnh..." : "Chọn ảnh"}
              </button>


              <span className="text-sm text-gray-600 truncate max-w-xs">
                {avatarFile ? avatarFile.name : "Chưa chọn ảnh nào"}
              </span>
            </div>

    
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploading}
              className="hidden"
            />


            {avatarFile && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="Preview avatar"
                  className="w-16 h-16 rounded-full object-cover border shadow"
                />
                <button
                  onClick={handleUploadAvatar}
                  disabled={uploading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {uploading ? "Đang cập nhật..." : "Cập nhật"}
                </button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Ngày tạo tài khoản:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString("vi-VN")}
            </p>
            {/* <p>
              <strong>Ngày cập nhật gần nhất:</strong>{" "}
              {new Date(user.updatedAt).toLocaleDateString("vi-VN")} // Không cần thiết!!!
            </p> */}
          </div>
        </div>


        <div className="lg:w-2/3 w-full bg-white p-5 sm:p-6 rounded-lg shadow-md border-t-4 border-[#a12b58]">
          <OrderChart userId={user._id} />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
