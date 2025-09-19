// Dùng biến môi trường, nếu không có thì mặc định localhost (dùng cho dev local)
const backendDomin = process.env.REACT_APP_API_URL || "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/tat-ca-nguoi-dung`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/cap-nhat-nguoi-dung`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/cap-nhat-san-pham`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/danh-sach-san-pham`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/chinh-sua-san-pham`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/lay-danh-muc-san-pham`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/danh-muc-san-pham`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/chi-tiet-san-pham`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/them-vao-gio-hang`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/so-luong-gio-hang`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/gio-hang`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/cap-nhat-gio-hang`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/xoa-san-pham-khoi-gio-hang`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/tim-kiem-san-pham`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/loc-san-pham`,
    method: "post",
  },
  payment: {
    url: `${backendDomin}/thanh-toan`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomin}/danh-sach-don-hang`,
    method: "get",
  },
  deleteProduct: {
    url: `${backendDomin}/xoa-san-pham`,
    method: "delete",
  },
  revenueChart: {
    url: `${backendDomin}/bieu-do-doanh-thu`,
    method: "get",
  },
};

export default SummaryApi;
