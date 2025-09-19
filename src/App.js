import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import SummaryApi from "./common";
import Context from "./context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chatbot from "./components/Chatbot";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        dispatch(setUserDetails(null));
      }
    } catch (error) {
      console.error("Lỗi lấy user:", error);
      dispatch(setUserDetails(null));
    }
  }, [dispatch]);

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.url.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  fetchUserAddToCart();

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
      }}
    >
      <ToastContainer position="top-center" />
      <Header />
      <main className="min-h-[calc(100vh-120px)] bg-slate-100 pt-6">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
      <ScrollToTopButton />
    </Context.Provider>
  );
}

export default App;
