import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
import { FaFilter, FaSortAmountDown, FaTimes } from "react-icons/fa";

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const location = useLocation();


  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("loai");
  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === "asc") {
      setData((prev) =>
        [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    }
    if (value === "dsc") {
      setData((prev) =>
        [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );

    setFilterCategoryList(arrayOfCategory);


    const queryString =
      arrayOfCategory.length > 0
        ? `?${arrayOfCategory.map((el) => `loai=${el}`).join("&")}`
        : "";
    navigate(`/loai-san-pham${queryString}`);
  }, [selectCategory]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="container mx-auto p-3 sm:p-4">

      <div className="lg:hidden flex justify-between items-center mb-4 sticky top-0 bg-white py-3 z-10">
        <h1 className="text-xl font-bold text-gray-800">Danh mục sản phẩm</h1>
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2 bg-[#A12B58] text-white px-4 py-2 rounded-lg transition-colors hover:bg-[#8a2449]"
        >
          <FaFilter className="text-sm" />
          <span className="text-sm">Bộ lọc</span>
        </button>
      </div>


      {mobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#A12B58]">Bộ lọc</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-[#A12B58]"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>


            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200 flex items-center gap-2">
                <FaSortAmountDown className="text-[#A12B58]" /> Sắp xếp
              </h3>
              <div className="space-y-3 mt-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "asc"}
                    value={"asc"}
                    onChange={handleOnChangeSortBy}
                    className="w-4 h-4 text-[#A12B58] focus:ring-[#A12B58] border-gray-300"
                  />
                  <label className="text-gray-700">Giá: Thấp đến cao</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "dsc"}
                    value={"dsc"}
                    onChange={handleOnChangeSortBy}
                    className="w-4 h-4 text-[#A12B58] focus:ring-[#A12B58] border-gray-300"
                  />
                  <label className="text-gray-700">Giá: Cao đến thấp</label>
                </div>
              </div>
            </div>

   
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200 flex items-center gap-2">
                <FaFilter className="text-[#A12B58]" /> Danh mục
              </h3>
              <div className="mt-3 space-y-3 max-h-72 overflow-y-auto scrollbar-hide">
                {productCategory.map((categoryName, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      checked={!!selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={`category-${categoryName?.value}`}
                      onChange={handleSelectCategory}
                      className="w-4 h-4 text-[#A12B58] focus:ring-[#A12B58] border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`category-${categoryName?.value}`}
                      className="text-gray-700 text-sm"
                    >
                      {categoryName?.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#A12B58] text-white py-3 rounded-lg mt-6 hover:bg-[#8a2449] transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">

        <div className="hidden lg:block bg-white p-5 rounded-lg shadow-sm border border-gray-100">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200 flex items-center gap-2">
              <FaSortAmountDown className="text-[#A12B58]" /> Sắp xếp
            </h3>
            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value={"asc"}
                  onChange={handleOnChangeSortBy}
                  className="w-4 h-4 text-[#A12B58] focus:ring-[#A12B58] border-gray-300"
                />
                <label className="text-gray-700">Giá: Thấp đến cao</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value={"dsc"}
                  onChange={handleOnChangeSortBy}
                  className="w-4 h-4 text-[#A12B58] focus:ring-[#A12B58] border-gray-300"
                />
                <label className="text-gray-700">Giá: Cao đến thấp</label>
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200 flex items-center gap-2">
              <FaFilter className="text-[#A12B58]" /> Danh mục
            </h3>
            <div className="mt-3 space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={!!selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={`category-${categoryName?.value}`}
                    onChange={handleSelectCategory}
                    className="w-4 h-4 text-[#A12B58] focus:ring-[#A12B58] border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`category-${categoryName?.value}`}
                    className="text-gray-700 text-sm"
                  >
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="px-0 lg:px-4">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium text-gray-800 text-base sm:text-lg">
              Tìm thấy{" "}
              <span className="text-[#A12B58] font-bold">{data.length}</span>{" "}
              sản phẩm
            </p>
            {data.length > 0 && (
              <div className="lg:hidden text-sm text-gray-500">
                {sortBy === "asc"
                  ? "Giá: Thấp đến cao"
                  : sortBy === "dsc"
                  ? "Giá: Cao đến thấp"
                  : ""}
              </div>
            )}
          </div>

          {data.length !== 0 ? (
            <VerticalCard data={data} loading={loading} />
          ) : (
            !loading && (
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center border border-gray-100">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaFilter className="text-2xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-500 text-sm">
                  Hãy thử chọn bộ lọc khác hoặc danh mục khác
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
