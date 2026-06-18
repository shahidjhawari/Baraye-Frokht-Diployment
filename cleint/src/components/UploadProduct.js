import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false); // ✅ Loader
  const [uploadProgress, setUploadProgress] = useState(0);     // ✅ Progress

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({ ...preve, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ 5MB size check
    if (file.size > 5 * 1024 * 1024) {
      toast.error("❌ Image 5MB se bari hai! Choti image upload karein.");
      return;
    }

    setImageUploading(true);
    setUploadProgress(0);

    // ✅ Progress animation
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) { clearInterval(progressInterval); return 90; }
        return prev + 10;
      });
    }, 200);

    try {
      const uploadImageCloudinary = await uploadImage(file);
      clearInterval(progressInterval);
      setUploadProgress(100);

      setData((preve) => ({
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      }));

      toast.success("✅ Image upload ho gayi!");
    } catch (err) {
      toast.error("❌ Upload fail hui, dobara try karein");
    } finally {
      setTimeout(() => {
        setImageUploading(false);
        setUploadProgress(0);
      }, 600);
    }
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((preve) => ({ ...preve, productImage: [...newProductImage] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">Category :</label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image : <span className="text-xs text-slate-400">(Max 5MB)</span>
          </label>

          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer overflow-hidden">

              {/* ✅ Loader — jab image upload ho rahi ho */}
              {imageUploading ? (
                <div className="flex flex-col items-center gap-2 w-full px-6">
                  {/* Spinning circle */}
                  <div className="w-10 h-10 border-4 border-fuchsia-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-slate-600 font-medium">
                    Uploading... {uploadProgress}%
                  </p>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-fuchsia-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                /* Normal upload icon */
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl"><FaCloudUploadAlt /></span>
                  <p className="text-sm">Upload Product Image</p>
                </div>
              )}

              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                accept="image/*"
                onChange={handleUploadProduct}
                disabled={imageUploading}
              />
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 flex-wrap">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="bg-slate-100 border cursor-pointer object-cover"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Please upload product image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">Selling Price :</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Selling Price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">Contact or WhatsApp Number :</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Contact Number"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">Address :</label>
          <input
            type="text"
            id="brandName"
            placeholder="EID Gah Mohala, Jhawarian"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            minLength={20}
            maxLength={60}
            required
          />

          <label htmlFor="description" className="mt-3">Description :</label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Description should not exceed 1000 characters"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
            maxLength={1000}
            required
          ></textarea>

          {/* ✅ Button disable during upload */}
          <button
            className="px-3 py-2 bg-fuchsia-600 text-white mb-10 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={imageUploading}
          >
            {imageUploading ? "Image upload ho rahi hai..." : "Upload Product"}
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;