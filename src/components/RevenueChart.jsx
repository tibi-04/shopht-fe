import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatLabel = (id, range) => {
  if (range === "year") return `${id.year}`;
  if (range === "month") return `${id.month}/${id.year}`;
  if (range === "week") return `Tuần ${id.week}, ${id.year}`;
  return `${id.day}/${id.month}/${id.year}`;
};

const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const RevenueChart = () => {
  const [chartData, setChartData] = useState(null);
  const [range, setRange] = useState("day");
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.revenueChart.url}?range=${range}`,
        { method: SummaryApi.revenueChart.method }
      );
      const result = await response.json();

      if (result.success) {
        const labels = result.data.map((item) => formatLabel(item._id, range));
        const data = result.data.map((item) => item.totalRevenue);

        setChartData({
          labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data,
              borderColor: "#a12b58",
              backgroundColor: "rgba(161, 43, 88, 0.2)",
              tension: 0.3,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
        setTopUsers(result.topUsers || []);
      } else {
        toast.error("Không thể tải dữ liệu doanh thu");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải biểu đồ doanh thu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [range]);


  const exportExcel = () => {
    if (!topUsers.length) {
      toast.warn("Không có dữ liệu để xuất");
      return;
    }
    const worksheetData = [
      ["Tên", "Email", "Tổng doanh thu (VNĐ)", "Số đơn hàng"],
      ...topUsers.map((user) => [
        user.name,
        user.email,
        user.totalRevenue,
        user.totalOrders,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TopUsers");

    XLSX.writeFile(
      workbook,
      `TopUsers_${range}_${new Date().toISOString()}.xlsx`
    );
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mt-4 md:mt-6 mx-auto max-w-7xl overflow-x-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-[#a12b58]">
        Biểu đồ doanh thu
      </h2>

      <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <label
          className="font-semibold text-sm md:text-base text-gray-700"
          htmlFor="range-select"
        >
          Chọn khoảng thời gian:
        </label>
        <select
          id="range-select"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a12b58] text-sm md:text-base w-full md:w-auto"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8 md:py-12">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-[#a12b58]"></div>
        </div>
      ) : chartData && chartData.labels.length ? (
        <div className="h-64 md:h-80 lg:h-96">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "#4b5563",
                    font: {
                      size: 14,
                    },
                  },
                },
                title: {
                  display: true,
                  text: `Doanh thu`,
                  font: { size: 16 },
                  color: "#374151",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => formatCurrency(context.parsed.y || 0),
                  },
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  titleColor: "#1f2937",
                  bodyColor: "#374151",
                  borderColor: "#e5e7eb",
                  borderWidth: 1,
                  padding: 10,
                  boxPadding: 5,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#6b7280",
                    maxRotation: 45,
                    minRotation: 45,
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                  ticks: {
                    color: "#6b7280",
                    callback: (value) => value.toLocaleString("vi-VN"),
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="py-8 md:py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4">Không có dữ liệu để hiển thị</p>
        </div>
      )}

      <div className="mt-8 md:mt-10">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-center text-[#a12b58]">
          Top 10 Khách hàng chi tiêu nhiều nhất
        </h3>

        {topUsers.length > 0 ? (
          <>
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-[#a12b58] text-white">
                  <tr>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left">Tên</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left hidden sm:table-cell">
                      Email
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-right">
                      Doanh thu (VNĐ)
                    </th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-right">
                      Số đơn
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user, idx) => (
                    <tr
                      key={user.userId}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-3 py-2 md:px-4 md:py-2 border-t border-gray-200 font-medium">
                        {user.name}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-2 border-t border-gray-200 hidden sm:table-cell text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-2 border-t border-gray-200 text-right font-medium">
                        {user.totalRevenue.toLocaleString("vi-VN")}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-2 border-t border-gray-200 text-right">
                        {user.totalOrders}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4 md:mt-6">
              <button
                onClick={exportExcel}
                className="bg-[#a12b58] hover:bg-[#8a2450] text-white px-4 py-2 md:px-6 md:py-2 rounded-lg transition flex items-center gap-2"
                aria-label="Xuất danh sách khách hàng ra Excel"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Xuất Excel
              </button>
            </div>
          </>
        ) : (
          <div className="py-6 text-center text-gray-500 bg-gray-50 rounded-lg">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="mt-2">Đang tải dữ liệu khách hàng...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
