import React, { useState } from "react";
import {
  FaUserCircle,
  FaWallet,
  FaChartLine,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { MdDashboard, MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./../../../style/Sidebar.css";
import Logout from './Logout';

const Sidebar = ({ toggleSidebar }) => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleAnalyticsMenu = () => {
    setIsAnalyticsOpen(!isAnalyticsOpen);
  };

  const togglePerformanceMenu = () => {
    setIsPerformanceOpen(!isPerformanceOpen);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>BizGlobal</h1>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <MdDashboard /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/account">
            <FaUserCircle /> My Account
          </Link>
        </li>
        <li>
          <Link to="/user-deposit">
            <FaWallet /> Deposit
          </Link>
        </li>
        <li>
          <Link to="/withdrawal">
            <FaWallet /> Withdrawal
          </Link>
        </li>
        <li>
          <Link to="/history">
            <AiOutlineBarChart /> Transaction History
          </Link>
        </li>
        <li>
          <Link to="/trading-history">
            <AiOutlineBarChart /> Trading History
          </Link>
        </li>
        {/* Analytics with Submenu */}
        <li>
          <div className="menu-item" onClick={toggleAnalyticsMenu}>
            <FaChartLine /> Analytics
            <FaChevronDown
              className={`chevron-icon ${isAnalyticsOpen ? "rotate" : ""}`}
            />
          </div>
          {isAnalyticsOpen && (
            <ul className="submenu">
              <li>
                <Link to="/analytics/economics-calendar">Economics Calendar</Link>
              </li>
              <li>
                <Link to="/analytics/analyst-news">Analyst News</Link>
              </li>
              <li>
                <Link to="/analytics/market-views">Market Views</Link>
              </li>
            </ul>
          )}
        </li>
        {/* Performance with Submenu */}
        <li>
          <div className="menu-item" onClick={togglePerformanceMenu}>
            <FaChartLine /> Performance
            <FaChevronDown
              className={`chevron-icon ${isPerformanceOpen ? "rotate" : ""}`}
            />
          </div>
          {isPerformanceOpen && (
            <ul className="submenu">
              <li>
                <Link to="/performance/summary">Summary</Link>
              </li>
              <li>
                <Link to="/performance/forex-benefits">Forex Benefits</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/support">
            <MdOutlineSupportAgent /> Support Hub
          </Link>
        </li>
        {/* Settings with Submenu */}
        <li>
          <div className="menu-item" onClick={toggleSettingsMenu}>
            <FaCog /> Settings
            <FaChevronDown
              className={`chevron-icon ${isSettingsOpen ? "rotate" : ""}`}
            />
          </div>
          {isSettingsOpen && (
            <ul className="submenu">
              <li>
                <Link to="/settings/profile-manage">Profile Manage</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
