import React, { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showRelatedProducts, setShowRelatedProducts] = useState(true);
  const messagesEndRef = useRef(null);
  const backendDomin =
    process.env.REACT_APP_API_URL || "http://localhost:8080/api";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, suggestedProducts, showRelatedProducts]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowRelatedProducts(false);

    try {
      const response = await fetch(`${backendDomin}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input.trim() }),
      });
      const data = await response.json();
      const botMessage = {
        sender: "bot",
        text: data.answer || "Đang xử lý...",
      };
      setMessages((prev) => [...prev, botMessage]);

      setProducts(data.products || []);
      setSuggestedProducts(data.suggestedProducts || []);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Lỗi khi gọi chatbot. Vui lòng thử lại." },
      ]);
      setProducts([]);
      setSuggestedProducts([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRelatedProducts = () => {
    setShowRelatedProducts(!showRelatedProducts);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          style={{ backgroundColor: "#a12b58" }}
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute top-0 right-0 flex h-3 w-3 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-red-500"></span>
          </span>
        </div>
      )}

      {isOpen && (
        <div
          className="w-72 xs:w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200"
          style={{ height: "500px", maxHeight: "80vh" }}
        >
          <div
            className="px-3 xs:px-4 py-3 rounded-t-lg flex justify-between items-center text-white"
            style={{ backgroundColor: "#a12b58" }}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-green-400 mr-2"></div>
              <h3 className="font-semibold text-sm xs:text-base">
                Hỗ trợ trực tuyến
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 xs:h-5 xs:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 xs:p-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 xs:w-16 xs:h-16 rounded-full mx-auto flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#f8d7da" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 xs:h-8 xs:w-8"
                    style={{ color: "#a12b58" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-xs xs:text-sm">
                  Xin chào! Bạn cần giúp gì về thiết bị công nghệ?
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 xs:mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 xs:px-4 xs:py-2 max-w-[85%] xs:max-w-[80%] ${
                    msg.sender === "user"
                      ? "rounded-tr-none text-white"
                      : "rounded-tl-none bg-white border border-gray-200"
                  }`}
                  style={{
                    backgroundColor: msg.sender === "user" ? "#a12b58" : "",
                  }}
                >
                  <p className="text-xs xs:text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {suggestedProducts.length > 0 && (
              <div className="bg-white p-2 xs:p-3 rounded-lg border border-gray-200 mt-2 mb-3">
                <p className="text-xs xs:text-sm font-semibold text-gray-700 mb-2">
                  Sản phẩm gợi ý:
                </p>
                {suggestedProducts.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center mb-2 xs:mb-3 cursor-pointer hover:bg-gray-100 p-1 xs:p-2 rounded-lg"
                    onClick={() =>
                      window.open(`/chi-tiet-san-pham/${p._id}`, "_blank")
                    }
                  >
                    <img
                      src={p.productImage?.[0] || "/default-image.png"}
                      alt={p.name}
                      className="w-8 h-8 xs:w-10 xs:h-10 object-cover rounded mr-2"
                    />
                    <div className="flex-1">
                      <p className="text-xs xs:text-sm font-medium text-gray-800 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500">{p.brand}</p>
                      <p
                        className="text-xs font-bold"
                        style={{ color: "#a12b58" }}
                      >
                        {p.price?.toLocaleString()}₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {products.length > 0 &&
              showRelatedProducts &&
              messages.length === 0 && (
                <div className="mt-3 xs:mt-4 pt-2 xs:pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-xs xs:text-sm text-gray-700">
                      Sản phẩm liên quan:
                    </p>
                    <button
                      onClick={toggleRelatedProducts}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Ẩn
                    </button>
                  </div>
                  <div className="space-y-2 xs:space-y-3">
                    {products.map((p) => (
                      <div
                        key={p._id}
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-1 xs:p-2 rounded-lg"
                        onClick={() =>
                          window.open(`/chi-tiet-san-pham/${p._id}`, "_blank")
                        }
                      >
                        <img
                          src={p.productImage?.[0] || "/default-image.png"}
                          alt={p.name}
                          className="w-10 h-10 xs:w-12 xs:h-12 object-cover rounded mr-2 xs:mr-3"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-xs xs:text-sm text-gray-800 truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {p.brand} - {p.category}
                          </p>
                          <p
                            className="text-xs font-bold"
                            style={{ color: "#a12b58" }}
                          >
                            {p.price?.toLocaleString()}₫
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 xs:p-3 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex">
              <textarea
                className="flex-grow resize-none border border-gray-300 rounded-l-md p-2 text-xs xs:text-sm focus:outline-none focus:ring-1"
                style={{ focusBorderColor: "#a12b58" }}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                onFocus={() => setShowRelatedProducts(false)}
              />
              <button
                onClick={sendMessage}
                className="px-3 xs:px-4 py-2 rounded-r-md text-white transition-colors"
                style={{ backgroundColor: "#a12b58" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 xs:h-5 xs:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Nhấn Enter để gửi, Shift + Enter để xuống dòng
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
