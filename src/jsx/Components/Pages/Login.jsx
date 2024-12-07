import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-12">
      {/* Left Section (30%) */}
      <div className="col-span-12 md:col-span-4 flex flex-col  bg-white p-4">
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
                Personal Information
              </h1>
              <p className="text-sm text-gray-500">
                Enter your e-mail address and your password.
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="demo@example.com"
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
              <input
                type="password"
                placeholder="••••••"
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9466FF]"
              />
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
              <button className="w-full bg-[#8257E6] hover:bg-[#9466FF] p-3 rounded-md text-white transition duration-300">
                Login
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Sign In With</p>
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
              <Link to="/Signup">
                <button className="w-full bg-gray-200 p-3 rounded-md hover:bg-[#9466FF] hover:text-white transition-colors duration-300 mt-4">
                  Create an account
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © Copyright by BIZGLOBAL All rights reserved.
        </div>
      </div>

      {/* Right Section (70%) */}
      <div className="col-span-12 md:col-span-8 hidden md:block bg-[#0A0B14]">
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
