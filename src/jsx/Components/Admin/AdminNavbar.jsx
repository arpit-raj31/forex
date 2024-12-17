import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import "./../../../style/Navbar.css";

export default function NavHeader() {
  const [formData, setFormData] = useState({ image: null });

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

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" className="logo-img" alt="Logo" />
        </Link>
      </div>

      <div>
        {/* Avatar */}
        <label htmlFor="image" className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer">
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
    </header>
  );
}
