import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const AddProduct = () => {
  const customtoken = JSON.parse(localStorage.getItem("userDetails"));
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState();

  const [category, setCategory] = useState([]);
  const [topSeller, setTopSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleSellerChange = (event) => {
    const value = event.target.value === "true";
    setTopSeller(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const loginToken = customtoken.token;
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        console.log("User Authentication Failed in Product");
      }

      const formData = new FormData();

      formData.append("productName", productData.productName);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("image", file);
      formData.append("bestSeller", topSeller);

      category.forEach((value) => {
        formData.append("category", value);
      });

      const result = await axios.post(
        `http://localhost:4000/product/add-product/${firmId}`,
        formData
      );
      setLoading(false);
      console.log(result);
      setProductData({
        productName: "",
        price: "",
        description: "",
      });
      setFile();
      setCategory([]);
      setTopSeller(false);
      toast.success("Product added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Product added failed");
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <>
          <div className="loaderParentDiv">
            <div className="loaderDivCenter">
              <ClipLoader color="#7d04a9" loading={loading} size={80} />
            </div>
          </div>
        </>
      )}
      <div className="login-section">
        <form onSubmit={handleAddProduct}>
          <p className="logo">ADD PRODUCT</p>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Enter Product Name"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
          />
          <label>Price:</label>
          <input
            type="text"
            placeholder="Enter Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
          <div>
            <label>Category:</label>
            <div className="category">
              <label className="ctg-label">Veg</label>
              <input
                type="checkbox"
                className="check-box"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
              <label className="ctg-label">Non-Veg</label>
              <input
                type="checkbox"
                className="check-box"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <label>BestSeller:</label>
            <div className="category">
              <label className="ctg-label">Yes</label>
              <input
                type="radio"
                value="true"
                checked={topSeller === true}
                onChange={handleSellerChange}
              />
              <label className="ctg-label">No</label>
              <input
                type="radio"
                value="false"
                checked={topSeller === false}
                onChange={handleSellerChange}
              />
            </div>
          </div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Enter Description"
            value={productData.description}
            onChange={handleChange}
          />
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
          <button type="submit" className="login">
            Add Product
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProduct;
