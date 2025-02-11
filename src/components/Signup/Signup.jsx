import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isLogin: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signUp", formData);

      if (response.status === 200) {
        alert("Signup successful!");
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="signup-container">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-row">
          <div className="form-input">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-input">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-input">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-input">
            <div className="checkbox-group">
              <input type="checkbox" name="isLogin" checked={formData.isLogin} onChange={handleChange} />
              <label>Already Logged In?</label>
            </div>
          </div>
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
