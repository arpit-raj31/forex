import React, { useState } from 'react';
import { Facebook, Linkedin, Instagram, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserLogin } from '../../../API/user';
import { useAuthStore } from '../../../Store/Store';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setToken, setUserId, setUsername } = useAuthStore();
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


    if (Object.values(formData).some((field) => field.trim() === "")) {
      setError("All fields are required!");
      return;
    }


    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await getUserLogin(formData);
      if (response) {
        const { token, user } = response;

      // Save to Zustand store
      setToken(token);
      setUserId(user._id);
      setUsername(user.username);

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("username", user.username);

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        setUserProfile(null);
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error Login user:", err);
      setError("Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[30%_70%]">

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
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-gray-500">Enter your username and password.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle type based on state
                  name="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                >
                  {passwordVisible ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 focus:ring-[#9466FF]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#8257E6] hover:bg-[#9466FF] p-3 rounded-md text-white transition duration-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="space-y-4">
              <div className="space-y-2">
           <Link to ="/forgotten-password">
           <button
  className="font-bold text-[#262465] py-2 px-4 rounded focus:ring focus:ring-[#262465]/50"
>
  Forget Password ?
</button>

           </Link>
                <div className="flex space-x-2">
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#362465' }}
                    >
                      <Facebook className="h-5 w-5 text-#362465" />
                    </a>
                  </button>
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#362465' }}
                    >
                      <Linkedin className="h-5 w-5 text-#362465" />
                    </a>
                  </button>
                  <button className="p-3 border rounded-md hover:bg-gray-100 transition duration-300">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#362465' }}
                    >
                      <Instagram className="h-5 w-5 text-#362465" />
                    </a>
                  </button>
                </div>
              </div>
              <Link to="/Signup">
                <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-[#9466FF] hover:text-white transition-colors duration-300 mt-4">
                  Create an account
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © Copyright by{' '}
          <a
            href="https://bizglobal.tech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#362465' }}
          >
            BIZGLOBAL
          </a>{' '}
          All rights reserved.
        </div>
      </div>

      {/* Right Section (70%) */}
      <div className="hidden bg-[#0A0B14] md:block">
        <img
          src="/bg6.jpg"
          alt="Login illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

