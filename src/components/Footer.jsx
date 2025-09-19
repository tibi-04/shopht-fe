import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaChevronRight,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsTelephoneFill, BsShieldCheck } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-[#f8e6ed] pt-10 pb-6 border-t border-[#A12B58]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <div className="text-[#A12B58] font-bold text-xl tracking-tight">
                Htshop
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center md:text-left leading-relaxed">
              Cung cấp thiết bị công nghệ hàng đầu với chất lượng và dịch vụ
              vượt trội.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              {[
                {
                  icon: <FaFacebook size={14} />,
                  color: "text-[#A12B58] hover:text-[#7a1f43]",
                },
                {
                  icon: <FaTwitter size={14} />,
                  color: "text-[#A12B58] hover:text-[#7a1f43]",
                },
                {
                  icon: <FaInstagram size={14} />,
                  color: "text-[#A12B58] hover:text-[#7a1f43]",
                },
                {
                  icon: <FaLinkedin size={14} />,
                  color: "text-[#A12B58] hover:text-[#7a1f43]",
                },
                {
                  icon: <FaYoutube size={14} />,
                  color: "text-[#A12B58] hover:text-[#7a1f43]",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${social.color} transition-colors duration-300`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#A12B58] text-sm font-semibold mb-3 uppercase tracking-wider border-b border-[#f4c6d6] pb-1">
              Liên kết nhanh
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-1">
                <FaChevronRight className="text-xs text-[#A12B58]" />
                <Link
                  className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                  to={"/"}
                >
                  Trang chủ
                </Link>
              </div>

              <div className="flex items-center space-x-1">
                <FaChevronRight className="text-xs text-[#A12B58]" />
                <Link
                  className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                  to={"khuyen-mai"}
                >
                  Khuyến mãi
                </Link>
              </div>

              <div className="flex items-center space-x-1">
                <FaChevronRight className="text-xs text-[#A12B58]" />
                <Link
                  className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                  to={"/gioi-thieu"}
                >
                  Giới thiệu
                </Link>
              </div>

              <div className="flex items-center space-x-1">
                <FaChevronRight className="text-xs text-[#A12B58]" />
                <Link
                  className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                  to={"/tin-tuc"}
                >
                  Tin tức
                </Link>
              </div>

              <div className="flex items-center space-x-1">
                <FaChevronRight className="text-xs text-[#A12B58]" />
                <Link
                  className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                  to={"/lien-he"}
                >
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#A12B58] text-sm font-semibold mb-3 uppercase tracking-wider border-b border-[#f4c6d6] pb-1">
              Danh mục sản phẩm
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Bàn phím")}`}
              >
                Bàn phím
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Camera")}`}
              >
                Camera
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Chuột")}`}
              >
                Chuột
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Laptop")}`}
              >
                Laptop
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Loa")}`}
              >
                Loa
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Màn hình")}`}
              >
                Màn hình
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Máy in")}`}
              >
                Máy in
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Phụ kiện")}`}
              >
                Phụ kiện
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Tai nghe")}`}
              >
                Tai nghe
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Tivi")}`}
              >
                Tivi
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Điện thoại")}`}
              >
                Điện thoại
              </Link>
              <Link
                className="text-xs text-gray-600 hover:text-[#A12B58] transition-colors duration-300"
                to={`/loai-san-pham?loai=${encodeURIComponent("Đồng hồ")}`}
              >
                Đồng hồ
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[#A12B58] text-sm font-semibold mb-3 uppercase tracking-wider border-b border-[#f4c6d6] pb-1">
              Liên hệ
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <HiLocationMarker className="mt-0.5 mr-2 text-[#A12B58] text-sm flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Nguyễn Văn Lượng, Quận Gò Vấp, TP.HCM
                </p>
              </li>
              <li className="flex items-center">
                <BsTelephoneFill className="mr-2 text-[#A12B58] text-sm" />
                <p className="text-xs text-gray-600">0973112480</p>
              </li>
              <li className="flex items-center">
                <IoMdMail className="mr-2 text-[#A12B58] text-sm" />
                <p className="text-xs text-gray-600">
                  htshop18092025@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#f4c6d6] pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <BsShieldCheck className="text-[#A12B58] mr-1 text-xs" />
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Htshop - Bảo lưu mọi quyền.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {["Điều khoản", "Bảo mật", "Đổi trả", "Hướng dẫn"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-xs text-gray-500 hover:text-[#A12B58] transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
