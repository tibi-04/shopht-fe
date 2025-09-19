import React, { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl text-[#A12B58]"
        >
          <HiMenuAlt3 />
        </button>
        <div className="font-semibold text-[#A12B58]">Trang quản trị</div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <aside
          className={`
            bg-white w-60 shadow-md flex flex-col border-r border-[#A12B58]
            transition-transform duration-300

            fixed top-0 left-0 h-full z-50
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

            md:translate-x-0 md:static md:h-auto md:z-auto
          `}
        >
          <div className="md:hidden flex justify-end p-4">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl text-[#A12B58]"
            >
              <HiX />
            </button>
          </div>

          <div className="h-40 flex flex-col justify-center items-center border-b">
            <div className="text-5xl relative flex justify-center mb-2">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full object-cover"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircle />
              )}
            </div>
            <p className="capitalize text-md font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>

          <nav className="flex-1 flex flex-col p-4 space-y-2">
            <Link
              to={"bieu-do-doanh-thu"}
              className="px-4 py-2 rounded-md hover:bg-slate-100 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Biểu đồ doanh thu
            </Link>
            <Link
              to={"tat-ca-nguoi-dung"}
              className="px-4 py-2 rounded-md hover:bg-slate-100 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Tất cả người dùng
            </Link>
            <Link
              to={"tat-ca-san-pham"}
              className="px-4 py-2 rounded-md hover:bg-slate-100 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Tất cả sản phẩm
            </Link>
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
