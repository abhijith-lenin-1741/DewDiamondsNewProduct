import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import s1 from "./S1.png";

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSignIn() {
    if (!username || !isValidEmail(username)) {
      setWarningMessage("Invalid Email ID");
      return;
    }
    if (!password) {
      setWarningMessage("Invalid password");
      return;
    }
  
    setLoading(true);
    setWarningMessage("");
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email: username, password }
      );
  
      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is returned from the API
  
        // Save token in cookies
        Cookies.set("authToken", token, { expires: 1 });
  
        // Retrieve token from cookies
        const savedToken = Cookies.get("authToken");
  
        // Alert the token
        alert(`Saved Token: ${savedToken}`);
  
        navigate("/dashboard");
      } else if (response.status === 403) {
        alert("Incorrect Password");
      }
    } catch (error) {
      if (error.response) {
        setWarningMessage(
           "Invalid login credentials"
          // `Error ${error.response.status}: ${
          //   "Invalid login credentials"
          // }`
        );
      } else if (error.request) {
        setWarningMessage("No response from server. Please try again.");
      } else {
        setWarningMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row">
      <div
        className="col-lg-6 d-none d-lg-block"
        style={{
          backgroundImage: `url(${s1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      ></div>

      <div className="col-lg-6">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
          </div>

          {warningMessage && (
            <div className="alert alert-danger" role="alert">
              {warningMessage}
            </div>
          )}

          <form className="user">
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                placeholder="Email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-user"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox small">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck"
                />
                <label className="custom-control-label" htmlFor="customCheck">
                  Remember Me
                </label>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-user btn-block"
              onClick={handleSignIn}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <hr />

            <a href="index.html" className="btn btn-google btn-user btn-block">
              <i className="fab fa-google fa-fw"></i> Login with Google
            </a>
            <a href="index.html" className="btn btn-facebook btn-user btn-block">
              <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
            </a>
          </form>

          <hr />

          <div className="text-center">
            <a className="small" href="forgot-password.html">
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <a className="small" href="/signup">
              Create an Account!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
