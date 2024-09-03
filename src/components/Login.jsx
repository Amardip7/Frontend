import React, { useState } from 'react';
import '../CSS/Login.css';
import logo from '../assets/icici_logo.svg';
import { logindata } from '../services/LoginService';
import { useNavigate } from 'react-router-dom'; // Updated import

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Updated to useNavigate

  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "User ID is required !!";
    }
    if (!formData.password) {
      newErrors.password = "Password is required !!";
    } 
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 1500); // Clear errors after 1.5 seconds
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await logindata(formData);
      if (response.success) {
        navigate('/OpDashboard'); // Updated to useNavigate
      } else {
        setErrors({ general: response.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again later.' });
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="logo1 mt-5">
          <img src={logo} alt="QR Code" />
        </div>
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="mt-3"><b>User ID: </b></label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div>
              <label htmlFor="password"><b>Password / PIN: </b></label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="show-password-container">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={handleShowPasswordChange}
              />
              <label htmlFor="show-password" className="show-password-label">Show password</label>
            </div>
            {errors.general && <span className="error">{errors.general}</span>}
            <button type="submit"><b>Login</b></button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
