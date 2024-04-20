import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import {useNavigate} from 'react-router-dom'
import { API_URL } from "../../data/apiPath";

//NOTE:-ADD FIRM TO VENDOR BASED ON JWT TOKEN

const AddFirm = () => {

  const navigate=useNavigate()
  const customtoken = JSON.parse(localStorage.getItem("userDetails"));
  const [firmData, setFirmData] = useState({
    firmname: "",
    area: "",
    offer: "",
  });
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFirmData({ ...firmData, [e.target.name]: e.target.value });
  };

  const handleImage = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value; //Eg:- if the user checks the "Technology" checkbox, the event's target.value will be "Technology".
    if (category.includes(value)) {
      //If category is already selected, remove it
      setCategory(category.filter((item) => item !== value));
    } else {
      // If category is not selected, add it

      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value; //Eg:- if the user checks the "Technology" checkbox, the event's target.value will be "Technology".
    if (region.includes(value)) {
      //If category is already selected, remove it
      setRegion(region.filter((item) => item !== value));
    } else {
      // If category is not selected, add it

      setRegion([...region, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const loginToken = customtoken.token;
      if (!loginToken) {
        console.log("User Authentication Failed");
      }
      //create a new instance to add and store the firm details

      const formData = new FormData();

      formData.append("firmname", firmData.firmname);
      formData.append("area", firmData.area);
      formData.append("offer", firmData.offer);
      formData.append("image", file);

      //to add multiple values we use forEach()

      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      const result = await axios.post(
        `${API_URL}/firm/add-firm`,
        formData,
        {
          headers: {
            "token": `${loginToken}`,
          },
        }
      );

      setLoading(false);
      setFirmData({
        firmname: "",
        area: "",
        offer: "",
      });
      setCategory([]);
      setRegion([]);
      setFile(null);
      console.log(result);
      toast.success("Firm added Successfully");
      // alert('Firm added successfully')
      // console.log('firmId',result.data.firmId)
      const firmId=result.data.firmId
      const vendorRestarauntName=result.data.vendorFirmName
      localStorage.setItem('firmId',firmId)
      localStorage.setItem('firmName',vendorRestarauntName)
      // navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Firm added Failed");
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
        <form onSubmit={handleSubmit}>
          <p className="logo">ADD RESTARAUNT</p>
          <label>Restaraunt Name:</label>
          <input
            type="text"
            placeholder="Enter Restaraunt Name"
            name="firmname"
            value={firmData.firmname}
            onChange={handleChange}
          />
          <label>Area:</label>
          <input
            type="text"
            placeholder="Enter Area Name"
            name="area"
            value={firmData.area}
            onChange={handleChange}
          />
          <div>
            <label>Category:</label>
            <div className="category">
              <label className="ctg-label">Veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                value="veg"
                onChange={handleCategoryChange}
                className="check-box"
              />
              <label className="ctg-label">Non-Veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                value="non-veg"
                onChange={handleCategoryChange}
                className="check-box"
              />
            </div>
            <label>Region:</label>
            <div className="category">
              <label className="ctg-label">South-Ind</label>
              <input
                type="checkbox"
                checked={region.includes("south-ind")}
                value="south-ind"
                onChange={handleRegionChange}
              />
              <label className="ctg-label">North-Ind</label>
              <input
                type="checkbox"
                checked={region.includes("north-ind")}
                value="north-ind"
                onChange={handleRegionChange}
              />
            </div>
          </div>
          <label>Offer:</label>
          <input
            type="text"
            name="offer"
            value={firmData.offer}
            onChange={handleChange}
          />
          <label>Image:</label>
          <input type="file" onChange={handleImage} />
          <button type="submit" className="login">
            Add Restaraunt
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddFirm;
