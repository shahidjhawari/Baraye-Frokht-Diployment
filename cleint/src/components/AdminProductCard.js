import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: data._id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message, {autoClose: 1500,});
        fetchdata();
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const productNameDisplay =
    data.productName.length > 15
      ? data.productName.substring(data.productName.length - 15) + "..."
      : data.productName;

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-25">
        <div className="lg:flex lg:justify-center items-center lg:w-32 lg:h-32">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{productNameDisplay}</h1>

        <div>
          <p className="text-fuchsia-600">
            {displayINRCurrency(data.price).replace(/\.00$/, "")}
          </p>
          <div className="flex">
            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="w-fit ml-2 p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={handleDeleteProduct}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
