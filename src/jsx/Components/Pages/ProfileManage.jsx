import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    otp: '',
    generatedOtp: '',

    image: null,
    documents: null,
    emailVerified: false,
    phoneVerified: false,
  });
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000); 
  const sendOtpToEmail = () => {
    const otp = generateOtp();
    setFormData((prev) => ({ ...prev, generatedOtp: otp }));
    // Integrate email API (e.g., SendGrid) here
    console.log(`Email OTP sent: ${otp}`); // Debug purpose only
    toast.success('OTP sent to your email.');
  };
  const sendOtpToPhone = () => {
    const otp = generateOtp();
    setFormData((prev) => ({ ...prev, generatedOtp: otp }));
    // Integrate SMS API (e.g., Twilio) here
    console.log(`Phone OTP sent: ${otp}`); // Debug purpose only
    toast.success('OTP sent to your phone.');
  };

  const verifyOtp = () => {
    if (formData.otp === formData.generatedOtp.toString()) {
      if (formData.email) {
        setFormData((prev) => ({ ...prev, emailVerified: true }));
        toast.success('Email verified successfully!');
      }
      if (formData.phone) {
        setFormData((prev) => ({ ...prev, phoneVerified: true }));
        toast.success('Phone number verified successfully!');
      }
    } else {
      toast.error('Invalid OTP.');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.emailVerified || !formData.phoneVerified) {
      toast.error('Please verify your email and phone number.');
      return;
    }
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (name === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(formData.email)) {
      setFormData((prev) => ({ ...prev, emailVerified: true }));
      toast.success('Email verified successfully!');
    } else {
      toast.error('Invalid email address.');
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (phoneRegex.test(formData.phone)) {
      setFormData((prev) => ({ ...prev, phoneVerified: true }));
      toast.success('Phone number verified successfully!');
    } else {
      toast.error('Invalid phone number.');
    }
  };

 
  return (
   <div className='mt-12'>
     <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-300"
    >
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-center text-[#362465] mb-6">
       Profile Manage 
      </h2>
 {/* Profile Image */}
 <div className="flex justify-center mb-6">
        <label htmlFor="image" className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150/000000/FFFFFF/?text=Profile"
                alt="Default Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>
      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email Field with Verify Button */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="flex items-center space-x-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
            placeholder="Enter your email"
            required
          />
          <button
            type="button"
            onClick={sendOtpToEmail}
            className="py-2 px-4 bg-[#362465] text-white font-medium rounded hover:bg-[#2e1e5e] transition duration-200"
          >
            Send OTP
          </button>
        </div>
        {formData.emailVerified && (
          <p className="text-green-600 text-sm mt-1">Email verified ✔️</p>
        )}
      </div>

      {/* Phone Number Field with Verify Button */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
            placeholder="Enter your phone number"
            required
          />
          <button
            type="button"
            onClick={sendOtpToPhone}
            className="py-2 px-4 bg-[#362465] text-white font-medium rounded hover:bg-[#2e1e5e] transition duration-200"
          >
            Send OTP
          </button>
        </div>
        {formData.phoneVerified && (
          <p className="text-green-600 text-sm mt-1">Phone number verified ✔️</p>
        )}
      </div>
 {/* OTP Verification */}
 <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">OTP</label>
        <input
          type="text"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          placeholder="Enter the OTP"
          required
        />
        <button
          type="button"
          onClick={verifyOtp}
          className="w-full mt-3 py-2 px-4 bg-[#362465] text-white font-medium rounded hover:bg-[#2e1e5e] transition duration-200"
        >
          Verify OTP
        </button>
      </div>


      {/* Address Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          placeholder="Enter your address"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nation</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          placeholder="Enter your address"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Profile Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          required
        />
      </div>

      {/* Documents Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Identity Proof
        </label>
        <input
          type="file"
          name="documents"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload PAN Card
        </label>
        <input
          type="file"
          name="documents"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#362465]"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#362465] text-white font-medium rounded hover:bg-[#2e1e5e] transition duration-200"
      >
        Submit
      </button>
    </form>
   </div>
  );
}

export default UserForm;