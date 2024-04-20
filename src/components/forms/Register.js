import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../../data/apiPath";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const [isShow, setIsShow] = useState(false);

  // const togglePassword = () => {
  //   setIsShow(!isShow);
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await axios.post(
        `${API_URL}/vendor/register`,
        formData
      );
      setLoading(false);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      console.log(result)
      toast.success("Rgistration Successful");
      navigate('/login')
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
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
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
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
            // type={isShow ? "text" : "password"}
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {/* <i onClick={togglePassword}>
              {isShow ? <FaEye /> : <FaEyeSlash />}
            </i> */}
          <button type="submit" className="login">
            REGISTER
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
