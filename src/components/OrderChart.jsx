import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrderChart = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendDomin =
    process.env.REACT_APP_API_URL || "http://localhost:8080/api";

  const fetchOrderStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${backendDomin}/don-hang-cua-nguoi-dung?userId=${userId}`,
        {
          credentials: "include",
        }
      );
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
      } else {
        toast.error(json.message || "Không thể tải dữ liệu đơn hàng");
      }
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrderStats();
  }, [userId]);

  if (loading) return <p>Đang tải biểu đồ đơn hàng...</p>;
  if (!data.length) return <p>Chưa có đơn hàng nào được thanh toán.</p>;

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#a12b58]">
        Biểu đồ đơn hàng đã thanh toán
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
            labelFormatter={(label) => `Ngày: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#A12B58"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderChart;
