import React, { useState } from "react";
import './index.css';
import Sidebar from "./jsx/Components/Pages/Sidebar"; // Assuming Sidebar is a separate component
import { FaBars } from "react-icons/fa"; // Import hamburger icon
import Navbar from "./jsx/Components/Pages/Navbar";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./jsx/Components/Pages/Dasboard";
import Footer from "./jsx/Components/Pages/Footer";
import Deposit from "./jsx/Components/Pages/Deposit";
import Withdraw from "./jsx/Components/Pages/Withdraw";
import Economics from "./jsx/Components/Pages/Economics";
import AnalystView from "./jsx/Components/Pages/AnalystView";
import MarketNews from "./jsx/Components/Pages/MarketNews";
import Login from "./jsx/Components/Pages/Login";
import Signup from "./jsx/Components/Pages/Signup";
import AllStrategies from "./jsx/Components/Pages/AllStrategies";
import History from "./jsx/Components/Pages/History";
import TransactionHistory from "./jsx/Components/Pages/TransactionHistory";
import Publish from "./jsx/Components/Pages/Publish";
import InnerLogin from "./jsx/Components/Pages/InnerLogin";
import MyAccount from "./jsx/Components/Pages/MyAccount";
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the state when the hamburger menu is clicked
  };

  return (
    <Routes>
      {/* Define routes for Login and Signup that don't have Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* For other routes, include Sidebar, Navbar, and Footer */}
      <Route 
        path="/*" 
        element={
          <div>
            <button
              className="menu-icon"
              onClick={toggleSidebar}
              style={{
                position: "fixed",
                top: "15px",
                left: "15px",
                fontSize: "1.5rem",
                zIndex: "1000",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4c249f",
              }}
            >
              <FaBars />
            </button>

            {/* Sidebar */}
            <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
              <Sidebar toggleSidebar={toggleSidebar} />
            </div>

              <Navbar />

            <div
              className="main-content"
              style={{
                marginLeft: "250px" ,
                marginTop: "40px",
                transition: "margin-left 0.3s",
              }}
            >
              <Routes>
            
                <Route path="/" element={<Dashboard />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="withdrawal" element={<Withdraw />} />
                <Route path="/analytics/economics-calendar" element={<Economics />} />
                <Route path="/analytics/analyst-news" element={<AnalystView />} />
                <Route path="/analytics/market-views" element={<MarketNews />} />
                <Route path="/copytrading/all-strategies" element={<AllStrategies />} />
                <Route path ="/trading-history" element={<History/>}/>
                <Route path="/history" element={<TransactionHistory/>}/>
                <Route path="/copytrading/publish" element={<Publish/>}/>
                <Route path="/account" element={<MyAccount/>}/>
                <Route path="/new-account" element={<InnerLogin/>}/>
              </Routes>
            </div>

          
            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
