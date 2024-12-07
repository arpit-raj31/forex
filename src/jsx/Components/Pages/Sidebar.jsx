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
import "./../../../style/Sidebar.css"
const Sidebar = ({ toggleSidebar }) => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State for Settings submenu

  const toggleAnalyticsMenu = () => {
    setIsAnalyticsOpen(!isAnalyticsOpen);
  };

  const togglePerformanceMenu = () => {
    setIsPerformanceOpen(!isPerformanceOpen);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen); // Toggle Settings submenu
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>BizGlobal</h1>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/">
            <MdDashboard /> Dashboard
          </a>
        </li>
        <li>
          <a href="/account">
            <FaUserCircle /> My Account
          </a>
        </li>
        <li>
          <a href="/deposit">
            <FaWallet /> Deposit
          </a>
        </li>
        <li>
          <a href="/withdrawal">
            <FaWallet /> Withdrawal
          </a>
        </li>
        <li>
          <a href="/history">
            <AiOutlineBarChart /> Transaction History
          </a>
        </li>
        <li>
          <a href="/trading-history">
            <AiOutlineBarChart /> Trading History
          </a>
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
                <a href="/analytics/economics-calendar">Economics Calendar</a>
              </li>
              <li>
                <a href="/analytics/analyst-news">Analyst News</a>
              </li>
              <li>
                <a href="/analytics/market-views">Market Views</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div className="menu-item" onClick={togglePerformanceMenu}>
            <FaChartLine /> Copy Trading
            <FaChevronDown
              className={`chevron-icon ${isPerformanceOpen ? "rotate" : ""}`}
            />
          </div>
          {isPerformanceOpen && (
            <ul className="submenu">
            
              <li>
                <a href="/copytrading/all-strategies">All Strategies</a>
              </li>
              <li>
                <a href="/copytrading/publish">Publlish Own Strategies</a>
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
                <a href="/performance/history-of-order">History of Order</a>
              </li>
              <li>
                <a href="/performance/summary">Summary</a>
              </li>
              <li>
                <a href="/performance/forex-benefits">Forex Benefits</a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a href="/support">
            <MdOutlineSupportAgent /> Support Hub
          </a>
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
                <a href="/settings/profile-manage">Profile Manage</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
