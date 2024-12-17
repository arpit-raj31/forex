import React, { useState } from "react";
import { Bell, Settings, Wallet } from "lucide-react"; // Added Wallet icon
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ReactFlagsSelect from "react-flags-select";
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
  const [selected, setSelected] = useState("US"); // Set default country as US
  const [isWalletOpen, setIsWalletOpen] = useState(false); // Toggle wallet dropdown
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" className="logo-img" alt="Logo" />
        </Link>
      </div>
      <div className="icons">
        {/* Flag Selector */}
        <ReactFlagsSelect
          selected={selected}
          onSelect={(code) => setSelected(code)}
          className="bg-gray-100 text-black rounded-md"
        />

        {/* Wallet Section */}
        <div
          className="wallet-dropdown-container"
          onMouseEnter={() => setIsWalletOpen(true)}
          onMouseLeave={() => setIsWalletOpen(false)}
        >
          <Button className="icon-btn wallet-btn">
            <Wallet className="icon" />
            <span className="sr-only">Wallet</span>
          </Button>
          {isWalletOpen && (
            <div className="wallet-dropdown">
              <p className="wallet-balance-title">Total Balance</p>
              <p className="wallet-balance-amount">$0.00</p>
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <Link to="/settings/profile-manage">
          <Button className="icon-btn">
            <Settings className="icon" />
            <span className="sr-only"></span>
          </Button></Link>

        <Button
          className="icon-btn"
          onClick={() => setShowNotifications(!showNotifications)} // Toggle notifications
        >
          <Bell className="icon" />
          <span className="sr-only"></span>
        </Button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="notifications-dropdown">
            <div className="notifications-header">Notifications</div>
            <ul className="notifications-list">
              <li className="notification-item">You have a new message</li>
              <li className="notification-item">Your order is ready</li>
              <li className="notification-item">System update available</li>
            </ul>
          </div>
        )}

        <label htmlFor="image" className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer">
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
