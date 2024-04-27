import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";
import TemporaryDrawer from "./TemporaryDrawer";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const [filterCategoryList, setFilterCategoryList] = useState(
    urlCategoryListinArray
  );

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
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
  };

  const handleSelectCategory = (category) => {
    if (filterCategoryList.includes(category)) {
      setFilterCategoryList(
        filterCategoryList.filter((cat) => cat !== category)
      );
    } else {
      setFilterCategoryList([...filterCategoryList, category]);
    }
  };

  const handleSortBy = (value) => {
    setSortBy(value);

    if (value === "asc") {
      setData((prevData) =>
        prevData.sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    }

    if (value === "dsc") {
      setData((prevData) =>
        prevData.sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const urlFormat = filterCategoryList.map((el, index) => {
      if (filterCategoryList.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [filterCategoryList, navigate]);

  return (
    <div className="container mx-auto p-4">
      <TemporaryDrawer
        handleSortBy={handleSortBy}
        handleSelectCategory={handleSelectCategory}
      />
      <div className="px-4">
        <p className="font-medium text-slate-800 text-lg my-2">
          Search Results : {data.length}
        </p>
        <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
          {data.length !== 0 && <VerticalCard data={data} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
