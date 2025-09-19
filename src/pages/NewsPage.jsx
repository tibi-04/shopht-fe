import React, { useState } from "react";

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

 
  const newsItems = [
    {
      id: 1,
      title: "Htshop ra mắt dòng laptop gaming mới với cấu hình mạnh mẽ",
      excerpt:
        "Bộ sưu tập laptop gaming mới với card RTX 40 series, CPU Intel thế hệ 13 và màn hình tần số quét 240Hz...",
      date: "15/09/2023",
      category: "Sản phẩm mới",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Khuyến mãi đặc biệt - Giảm giá đến 30% các thiết bị Apple",
      excerpt:
        "Nhân dịp kỷ niệm 5 năm thành lập, Htshop giảm giá 30% cho toàn bộ sản phẩm Apple từ iPhone đến MacBook...",
      date: "10/09/2023",
      category: "Khuyến mãi",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Htshop mở rộng hệ thống cửa hàng tại Hà Nội và TP.HCM",
      excerpt:
        "Với mong muốn phục vụ khách hàng tốt hơn, Htshop chính thức khai trương 5 cửa hàng mới tại các quận trung tâm...",
      date: "05/09/2023",
      category: "Cửa hàng",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Hướng dẫn chọn cấu hình máy tính phù hợp với nhu cầu",
      excerpt:
        "Bài viết hướng dẫn chi tiết cách chọn cấu hình máy tính phù hợp với từng nhu cầu từ văn phòng đến gaming và đồ họa...",
      date: "01/09/2023",
      category: "Mẹo hay",
      image:
        "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Xu hướng công nghệ nổi bật năm 2023",
      excerpt:
        "Cập nhật những xu hướng công nghệ mới nhất năm 2023, từ AI đến thiết bị đeo thông minh và IoT...",
      date: "28/08/2023",
      category: "Xu hướng",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Htshop hợp tác với Intel ra mắt bộ vi xử lý thế hệ mới",
      excerpt:
        "Chúng tôi vui mừng thông báo về hợp tác mới với Intel để ra mắt dòng sản phẩm máy tính sử dụng bộ vi xử lý thế hệ 14...",
      date: "25/08/2023",
      category: "Sự kiện",
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      title: "Đánh giá chi tiết Samsung Galaxy Z Fold5",
      excerpt:
        "Trải nghiệm thực tế và đánh giá chi tiết về chiếc smartphone màn hình gập flagship mới nhất của Samsung...",
      date: "20/08/2023",
      category: "Đánh giá",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const categories = [
    "Tất cả",
    "Sản phẩm mới",
    "Khuyến mãi",
    "Cửa hàng",
    "Mẹo hay",
    "Xu hướng",
    "Sự kiện",
    "Đánh giá",
    "Công nghệ",
  ];

  const filteredNews =
    activeCategory === "Tất cả"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-[#a12b58] to-[#7a1f44] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tin Tức Công Nghệ</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất về công nghệ và các sản phẩm mới từ
            Htshop
          </p>
        </div>
      </div>


      <main className="container mx-auto px-4 py-8">

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 justify-center flex-nowrap md:flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#a12b58] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#a12b58] text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-[#a12b58] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <button className="text-[#a12b58] font-medium hover:underline flex items-center">
                    Đọc thêm
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="text-xs">248</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Trước
            </button>
            <button className="px-4 py-2 rounded bg-[#a12b58] text-white">
              1
            </button>
            <button className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
              2
            </button>
            <button className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
              3
            </button>
            <button className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center">
              Tiếp
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
