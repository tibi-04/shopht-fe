import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../common";
import { Link } from "react-router-dom";

const formatCurrency = (amount, currency = "VND") => {
  if (typeof amount !== "number") return "0";
  if (currency?.toLowerCase() === "vnd") {
    return `${amount.toLocaleString("vi-VN")} VND`;
  }
  return `${currency?.toUpperCase()} ${amount}`;
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios({
          url: api.getOrder.url,
          method: api.getOrder.method,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Đang tải đơn hàng...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!orders.length)
    return (
      <p className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        Chưa có đơn hàng nào đã được thanh toán
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Danh sách đơn hàng</h1>
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-4 mb-6 shadow-sm bg-white"
        >

          <p className="font-medium mb-3">
            {new Date(order.createdAt).toLocaleDateString("vi-VN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(order.createdAt).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>


          <div className="mb-3 text-sm text-gray-600">
            {order.shippingDetails && (
              <>
                <p>Tên nhận hàng: {order.shippingDetails.name || "Không có"}</p>
                <p>
                  Địa chỉ:{" "}
                  {order.shippingDetails.address
                    ? `${order.shippingDetails.address.line1 || ""}, ${
                        order.shippingDetails.address.city || ""
                      }, ${order.shippingDetails.address.country || ""}`
                    : "Không có"}
                </p>
              </>
            )}
          </div>

       
          {order.products.map((product) => (
            <div
              key={product.productId}
              className="flex items-center gap-4 py-3 border-t"
            >
              <Link to={`/chi-tiet-san-pham/${product.productId}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded cursor-pointer"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to={`/chi-tiet-san-pham/${product.productId}`}
                  className="font-semibold hover:underline cursor-pointer"
                >
                  {product.name}
                </Link>
                <p className="text-red-500 font-medium">
                  {formatCurrency(product.price, order.currency)}
                </p>
                <p>Số lượng: {product.quantity}</p>
              </div>
            </div>
          ))}

       
          <div className="flex justify-between border-t pt-4 mt-3 text-sm">
            <div>
              <p className="font-semibold">Chi tiết thanh toán:</p>
              <p>Phương thức: {order.paymentMethod || "Thanh Toán Online"}</p>
              <p>
                Trạng thái:{" "}
                <span
                  className={
                    order.paymentStatus === "paid"
                      ? "text-green-600 font-semibold"
                      : order.paymentStatus === "failed"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {order.paymentStatus === "paid"
                    ? "Thành công"
                    : order.paymentStatus === "failed"
                    ? "Thất bại"
                    : order.paymentStatus || "Không xác định"}
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold">Chi tiết giao hàng:</p>
              <p>
                Phí vận chuyển:{" "}
                {formatCurrency(order.shippingAmount || 100000, order.currency)}
              </p>
            </div>
          </div>


          <div className="text-right font-semibold mt-3">
            Tổng cộng: {formatCurrency(order.amountTotal, order.currency)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
