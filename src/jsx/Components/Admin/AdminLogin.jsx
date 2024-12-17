import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../Store/Store';
import { getAdminLogin } from '../../../API/admin';
import { Eye, EyeOff } from 'lucide-react'; // Add icons for visibility toggle

const AdminLogin = () => {
  const [secretKey, setSecretKey] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setToken, setUsername } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (secretKey.trim() === "") {
      setError("Secret key is required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await getAdminLogin({ secretKey });
      console.log(response);

      if (response.data.token && response.data.username) {

        const { token, username } = response.data;

        // Save to Zustand store
        setToken(token);
        setUsername(username);

      
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        alert("Login successful!");
        navigate("/admin/admin-dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[30%_70%]">
      {/* Left Section (30%) */}
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
              <h1 className="text-2xl font-semibold tracking-tight">
                Admin Authentication
              </h1>
              <p className="text-sm text-gray-500">
                Enter your admin secret key to access the dashboard.
              </p>
            </div>
            <div className="space-y-4 relative">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle input type
                  placeholder="Enter Secret Key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <button
                onClick={handleSubmit}
                className="w-full bg-[#362465] hover:bg-[#362465] p-3 rounded-md font-semibold text-white transition duration-300"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Authenticate'}
              </button>
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
          alt="Admin Login illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
