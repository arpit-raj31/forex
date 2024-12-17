import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import './index.css';

// User Components
import Sidebar from "./jsx/Components/Pages/Sidebar";
import Navbar from "./jsx/Components/Pages/Navbar";
import Footer from "./jsx/Components/Pages/Footer";
import Login from "./jsx/Components/Pages/Login";
import Signup from "./jsx/Components/Pages/Signup";
import UserDeposit from "./jsx/Components/Pages/UserDeposit";
import Economics from "./jsx/Components/Pages/Economics";
import AnalystView from "./jsx/Components/Pages/AnalystView";
import MarketNews from "./jsx/Components/Pages/MarketNews";
import AllStrategies from "./jsx/Components/Pages/AllStrategies";
import History from "./jsx/Components/Pages/History";
import TransactionHistory from "./jsx/Components/Pages/TransactionHistory";
import Publish from "./jsx/Components/Pages/Publish";
import InnerSignup from "./jsx/Components/Pages/InnerSignup";
import InnerLogin from "./jsx/Components/Pages/InnerLogin";
import MyAccount from "./jsx/Components/Pages/MyAccount";
import ProfileManager from "./jsx/Components/Pages/ProfileManage";
import Subscription from "./jsx/Components/Pages/Subscription";
import Dashboard from "./jsx/Components/Pages/Dasboard";
import Withdrawal from "./jsx/components/Pages/Withdrawal";

// Admin Components
import AdminLogin from "./jsx/Components/Admin/AdminLogin";
import BSidebar from "./jsx/components/Admin/BSidebar";
import AdminFooter from "./jsx/components/Admin/AdminFooter";
import AdminDashboard from "./jsx/Components/Admin/AdminDashboard";
import Withdraw from "./jsx/Components/Admin/Withdraw";
import Settings from "./jsx/components/Admin/Settings";
import OrdersTable from "./jsx/Components/Admin/OrdersTable";
import ABook from "./jsx/components/Admin/ABook";
import BBook from "./jsx/components/Admin/BBook";
import Deposit from "./jsx/Components/Admin/Deposit";
import ManageUser from "./jsx/components/Admin/ManageUser";
import WithdrawalList from "./jsx/components/Admin/WithdrawalList";
import DepositList from "./jsx/components/Admin/DepositList";
import ManageLeads from "./jsx/components/Admin/ManageLeads";
import CopyTrading from "./jsx/components/Admin/CopyTrading";
import UserManagement from "./jsx/components/Admin/UserManagement";
import ABookUserMargin from "./jsx/components/Admin/ABookUserMargin";
import BBookUserMargin from "./jsx/components/Admin/BBookUserMargin";
import UserDocuments from "./jsx/components/Admin/UserDocuments";
import ActiveUser from "./jsx/components/Admin/ActiveUser";
import SubscriptionPanel from "./jsx/Components/Admin/SubscriptionPanel";
import Analyst from "./jsx/Components/Admin/Analyst";
import AdminNavbar from "./jsx/Components/Admin/AdminNavbar";
import WindowDashboard from "./jsx/Components/Pages/WIndowDashBoard";
import { useAuthStore } from "./Store/Store";
import ForgotPassword  from "./jsx/Components/Pages/Forgetpassword"
const ProtectRoute = ({ children }) => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  // Ensure username is not 'admin' and token exists
  if (!token || username === 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};


const ProtectRoute1 = ({ children }) => {
  const { auth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (auth || (token && username === 'admin')) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [auth, token, username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token || username !== 'admin') {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};



const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/forgotten-password" element={<ForgotPassword />}/>

      <Route
        path="/webterminal"
        element={
          <ProtectRoute>
            <WindowDashboard />
          </ProtectRoute>
        }
      />


      {/* User Routes */}
      <Route
        path="/*"
        element={
          <ProtectRoute>
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
              <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                <Sidebar toggleSidebar={toggleSidebar} />
              </div>
              <Navbar />
              <div
                className="main-content"
                style={{
                  marginLeft: "250px",
                  marginTop: "40px",
                  transition: "margin-left 0.3s",
                }}
              >
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="user-deposit" element={<UserDeposit />} />
                  <Route path="withdrawal" element={<Withdrawal />} />
                  <Route path="analytics/economics-calendar" element={<Economics />} />
                  <Route path="analytics/analyst-news" element={<AnalystView />} />
                  <Route path="analytics/market-views" element={<MarketNews />} />
                  <Route path="copytrading/all-strategies" element={<AllStrategies />} />
                  <Route path="trading-history" element={<History />} />
                  <Route path="history" element={<TransactionHistory />} />
                  <Route path="copytrading/publish" element={<Publish />} />
                  <Route path="account" element={<MyAccount />} />
                  <Route path="new-account" element={<InnerSignup />} />
                  <Route path="settings/profile-manage" element={<ProfileManager />} />
                  <Route path="trade-login" element={<InnerLogin />} />
                  <Route path="subscription" element={<Subscription />} />
               
                </Routes>
                <Footer />
              </div>
            </div>
          </ProtectRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectRoute1>
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
              <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
                <BSidebar toggleSidebar={toggleSidebar} />
              </div>
              <AdminNavbar />
              <div
                className="main-content"
                style={{
                  marginLeft: "250px",
                  marginTop: "40px",
                  transition: "margin-left 0.3s",
                }}
              >
                <Routes>
                  <Route path="admin-dashboard" element={<AdminDashboard />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="order-table" element={<OrdersTable />} />
                  <Route path="a-book" element={<ABook />} />
                  <Route path="b-book" element={<BBook />} />
                  <Route path="manage-user" element={<ManageUser />} />
                  <Route path="withdraw" element={<Withdraw />} />
                  <Route path="deposit" element={<Deposit />} />
                  <Route path="withdrawal-list" element={<WithdrawalList />} />
                  <Route path="deposit-list" element={<DepositList />} />
                  <Route path="manage-leads" element={<ManageLeads />} />
                  <Route path="copytrading" element={<CopyTrading />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="user-documents" element={<UserDocuments />} />
                  <Route path="abook-margin" element={<ABookUserMargin />} />
                  <Route path="bbook-margin" element={<BBookUserMargin />} />
                  <Route path="active-user" element={<ActiveUser />} />
                  <Route path="subscription-panel" element={<SubscriptionPanel />} />
                  <Route path="analyst" element={<Analyst />} />
                </Routes>
                <AdminFooter />
              </div>
            </div>
          </ProtectRoute1>
        }
      />
    </Routes>

  );
};

export default App;