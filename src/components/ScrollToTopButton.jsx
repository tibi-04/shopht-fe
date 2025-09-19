import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight;
    setVisible(scrollTop > windowHeight * 0.3);
  };

  const scrollToTop = () => {
    const scrollDuration = 1000;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-[#a12b58] hover:bg-[#8e254d] text-white text-xl shadow-xl flex items-center justify-center transition-all duration-300"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
