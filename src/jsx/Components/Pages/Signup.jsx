import React, { useState } from "react";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (Object.values(formData).some((field) => field.trim() === "")) {
      setError("All fields are required!");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Check password strength
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setError("");
    console.log("Signup Data:", formData);
    alert("Signup successful!");
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[30%_70%]">
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
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                aria-label="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password (Min. 6 characters)"
                aria-label="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
         
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#8257E6] hover:bg-[#9466FF] p-3 rounded-md text-white transition duration-300"
              >
                Signup
              </button>
            </form>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Or Sign Up With</p>
                <div className="flex space-x-2">
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <Facebook className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <Linkedin className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <Twitter className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <Link to="/login">
                <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-[#9466FF] hover:text-white transition-colors duration-300 mt-4">
                  Already have an account? Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © Copyright by BIZGLOBAL All rights reserved.
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
