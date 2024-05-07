import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const fetchAllProduct = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      const userId = decodedToken?._id;
      if (userId) {
        setLoggedInUserId(userId);
      } else {
        console.error("User ID not found in token");
      }
    }

    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setUserProducts(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  useEffect(() => {
  }, [userProducts]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-8 border-light-300 bg-fuchsia-600 text-white hover:bg-amber-500 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Sell Products
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {userProducts
          .filter((product) => product.userId === loggedInUserId)
          .map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          ))}
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
