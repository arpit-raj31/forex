import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="mx-auto w-32" />
          </Link>
        </div>
        <h4 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Forgot Password
        </h4>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#362465]"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#362465] text-white font-semibold py-3 rounded-md hover:bg-[#362465] transition duration-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
          {message && (
            <p className="mt-4 text-center text-sm text-[#362465]">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
