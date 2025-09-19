const backendDomin = "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/tat-ca-nguoi-dung`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/cap-nhat-nguoi-dung`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/cap-nhat-san-pham`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/danh-sach-san-pham`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/chinh-sua-san-pham`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/lay-danh-muc-san-pham`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/danh-muc-san-pham`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/chi-tiet-san-pham`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/them-vao-gio-hang`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/so-luong-gio-hang`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/gio-hang`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/cap-nhat-gio-hang`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/xoa-san-pham-khoi-gio-hang`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/tim-kiem-san-pham`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/loc-san-pham`,
    method: "post",
  },
  payment: {
    url: `${backendDomin}/api/thanh-toan`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomin}/api/danh-sach-don-hang`,
    method: "get",
  },
  deleteProduct: {
    url: `${backendDomin}/api/xoa-san-pham`,
    method: "delete",
  },
  revenueChart: {
    url: `${backendDomin}/api/bieu-do-doanh-thu`,
    method: "get",
  },
};

export default SummaryApi;
