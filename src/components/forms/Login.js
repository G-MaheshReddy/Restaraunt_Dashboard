import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await axios.post(
        `${API_URL}/vendor/login`,
        formData
      );
      setLoading(false);
      toast.success("Login Successful");
      setFormData({
        email: "",
        password: "",
      });
      console.log(result);
      localStorage.setItem("userDetails", JSON.stringify(result.data));
      // localStorage.setItem('userEmail',result.email)
      // localStorage.setItem('loginToken',result.token)
      navigate("/welcome");

      const vendorId=result.data.vendorId;
      console.log("checking for vendor-id",vendorId)

      const vendorResult=await axios.get(`${API_URL}/vendor/single-vendor/${vendorId}`)
      if(vendorResult.status){
        const vendorRestId=vendorResult.data.vendorRestId;
        console.log("checking for vendorRestId",vendorRestId)
        localStorage.setItem('firmId',vendorRestId)
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
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
          <p className="logo">REDDY'S RESTARAUNT</p>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="login">
            LOGIN
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
