import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#a12b58] mb-4">
            Liên Hệ HtShop
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy đến cửa hàng
            hoặc liên hệ với chúng tôi qua các thông tin dưới đây.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Thông Tin Liên Hệ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#a12b58] bg-opacity-10 p-4 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-[#a12b58]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Địa chỉ</h3>
                  <p className="text-gray-600 mt-1">
                    59 Ngô Mây, Bình Định, Việt Nam
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#a12b58] bg-opacity-10 p-4 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-[#a12b58]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Điện thoại
                  </h3>
                  <p className="text-gray-600 mt-1">(0973) 112 480</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#a12b58] bg-opacity-10 p-4 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-[#a12b58]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-1">htshop18092025@gmail.com</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#a12b58] bg-opacity-10 p-4 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-[#a12b58]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Giờ làm việc
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Thứ 2 - Thứ 6: 8:00 - 18:00
                  </p>
                  <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                  <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Kết nối với chúng tôi
                </h3>
                <div className="flex justify-center space-x-6">
                  <a
                    href="#"
                    className="text-[#a12b58] hover:text-[#8a1f4a] transition duration-200"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-[#a12b58] hover:text-[#8a1f4a] transition duration-200"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-[#a12b58] hover:text-[#8a1f4a] transition duration-200"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-[#a12b58] hover:text-[#8a1f4a] transition duration-200"
                  >
                    <span className="sr-only">YouTube</span>
                    <svg
                      className="h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-80 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.238804851678!2d109.2141589757878!3d13.767870986529657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f1bf5c43181e5%3A0x2b5a3a2e4b3c3b3a!2zNTkgTmfDtCBNw6J5LCBRdeG6rW4gVGjhuq9uZywgVHAuIFF1eSBOaG9uLCBCw6xuaCBExrDGoW5nIDU5MDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1672897173172!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HtShop Location - 59 Ngô Mây, Bình Định"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
