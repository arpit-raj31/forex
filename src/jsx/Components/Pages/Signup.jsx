import React, { useState } from "react";
import { Facebook, Linkedin, Instagram, Eye, EyeOff } from "lucide-react"; // Import Eye icons
import { Link, useNavigate } from "react-router-dom";
import { getRegisterUser } from "../../../API/user"; // Import your API function

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    password: "",
    email: "",
  });
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [showNotification, setShowNotification] = useState(false); // State for notification bar
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (Object.values(formData).some((field) => field.trim() === "")) {
      setError("All fields are required!");
      return;
    }

    // Check password strength
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call the API to register the user
      const response = await getRegisterUser(formData); // Pass formData to your API function

      if (response) {
        setUserProfile(response);
        setShowNotification(true); // Show the welcome notification on successful signup
        setTimeout(() => {
          setShowNotification(false); // Hide notification after 4 seconds
        }, 4000);
      } else {
        setUserProfile(null);
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setError("Error registering user.");
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[30%_70%]">
      {/* Notification Bar */}
      {showNotification && (
        <div className="fixed top-0 left-0 w-full bg-[#8257E6] text-white text-center py-3 transition-all duration-500">
          <p>Welcome to CrownFx</p>
        </div>
      )}

      {/* Left Section */}
      <div className="flex flex-col p-8 md:p-12 bg-white">
        <div className="mb-8">
          <img
            src="/bizglobalbg.png"
            alt="BizGlobal Logo"
            width={150}
            height={40}
          />
        </div>
        <div className="flex-1">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Signup</h1>
              <p className="text-sm text-gray-500">
                Create a new account by filling the fields below.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                aria-label="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                aria-label="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle the password visibility
                  name="password"
                  placeholder="Password (Min. 6 characters)"
                  aria-label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                  {passwordVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#8257E6] hover:bg-[#362465] p-3 rounded-md text-white transition duration-300"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Signup"}
              </button>
            </form>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Read More</p>
                <div className="flex space-x-2">
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#362465" }}
                    >
                      <Facebook className="h-5 w-5 text-#362465" />
                    </a>
                  </button>
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#362465" }}
                    >
                      <Linkedin className="h-5 w-5 text-#362465" />
                    </a>
                  </button>
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#362465" }}
                    >
                      <Instagram className="h-5 w-5 text-#362465" />
                    </a>
                  </button>
                </div>
              </div>
              <Link to="/login">
                <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-[#362465] hover:text-white transition-colors duration-300 mt-4">
                  Already have an account? Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © Copyright by{" "}
          <a
            href="https://bizglobal.tech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#362465" }}
          >
            BIZGLOBAL
          </a>{" "}
          All rights reserved.
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden bg-[#0A0B14] md:block">
        <img
          src="/bg6.jpg"
          alt="Signup illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
