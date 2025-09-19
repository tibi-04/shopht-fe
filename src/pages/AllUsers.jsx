import { useEffect, useState, useCallback } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import ChangUserRole from "../components/ChangUserRole";
import ROLE from "../common/role";

export const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const mapRoleToName = (role) => {
    if (role === "ADMIN") return ROLE.ADMIN;
    if (role === "GENERAL") return ROLE.GENERAL;
    return role;
  };

  const fetchAllUsers = useCallback(async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();
      console.log("Response all users:", dataResponse);

      if (dataResponse.success) {
        const mappedUsers = dataResponse.data.map((user) => ({
          ...user,
          role: mapRoleToName(user.role),
        }));
        setAllUsers(mappedUsers);
      } else {
        toast.error(dataResponse.message || "Lỗi khi lấy danh sách người dùng");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Lỗi kết nối tới server");
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border">
        <thead>
          <tr className="bg-[#A12B58] text-white">
            <th className="border text-base font-medium px-2 py-1">Số thứ tự</th>
            <th className="border text-base font-medium px-2 py-1">Họ và tên</th>
            <th className="border text-base font-medium px-2 py-1">Email</th>
            <th className="border text-base font-medium px-2 py-1">Vai trò</th>
            <th className="border text-base font-medium px-2 py-1">
              Ngày tạo tài khoản
            </th>
            <th className="border text-base font-medium px-2 py-1">
              Chỉnh sửa
            </th>
          </tr>
        </thead>
        <tbody>
          {allUser.length > 0 ? (
            allUser.map((el, index) => (
              <tr key={el._id} className="hover:bg-slate-50">
                <td className="border text-base text-center px-2 py-1">
                  {index + 1}
                </td>
                <td className="border text-base text-center px-2 py-1">
                  {el?.name}
                </td>
                <td className="border text-base text-center px-2 py-1">
                  {el?.email}
                </td>
                <td className="border text-base text-center px-2 py-1">
                  {el?.role || "N/A"}
                </td>
                <td className="border text-base text-center px-2 py-1">
                  {el?.createdAt
                    ? new Date(el.createdAt).toLocaleDateString("vi-VN")
                    : "N/A"}
                </td>
                <td className="text-center">
                  <button
                    className="bg-[#FADBE4] p-2 rounded-full cursor-pointer hover:bg-[#A12B58] hover:text-white"
                    onClick={() => setSelectedUser(el)}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <ChangUserRole
          userId={selectedUser._id}
          name={selectedUser.name}
          email={selectedUser.email}
          role={selectedUser.role}
          onClose={() => setSelectedUser(null)}
          callfunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
