import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

export const ChangUserRole = ({
  userId,
  name,
  email,
  role,
  onClose,
  callfunc,
}) => {
  const mapRoleToName = (role) => {
    if (role === "ADMIN") return ROLE.ADMIN;
    if (role === "GENERAL") return ROLE.GENERAL;
    return role;
  };

  const [userRole, setUserRole] = useState(mapRoleToName(role));

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callfunc();
      }
      console.log("Role Update", responseData);
    } catch (error) {
      console.error("Lỗi cập nhật vai trò:", error.message);
      toast.error("Có lỗi xảy ra khi cập nhật vai trò");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
          onClick={onClose}
          aria-label="Đóng"
        >
          <IoMdClose size={24} />
        </button>

  
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Thay đổi vai trò người dùng</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
        </div>

   
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 min-w-[80px]">Tên:</span>
            <span className="text-gray-900">{name}</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 min-w-[80px]">Email:</span>
            <span className="text-gray-900 break-all">{email}</span>
          </div>
        </div>


        <div className="mb-8">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Vai trò hiện tại
          </label>
          <select
            id="role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el === ROLE.ADMIN ? "Quản trị viên" : "Người dùng"}
              </option>
            ))}
          </select>
        </div>


        <button
          className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          onClick={updateUserRole}
        >
          Xác nhận thay đổi
        </button>
      </div>
    </div>
  );
};

export default ChangUserRole;