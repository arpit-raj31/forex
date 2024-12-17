import React, { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  ClipboardList,
  BookOpen,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  List,
  Copy,
  Paperclip,
  DollarSign,
  BarChart,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./../../../style/Sidebar.css";
import AdminLogout from "./AdminLogout";

const BSidebar = ({ toggleSidebar }) => {
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
    <div className="sidebar mt-12">
    
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/admin-dashboard">
            <LayoutDashboard /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/settings">
            <Settings /> Settings
          </Link>
        </li>
        <li>
          <Link to="/admin/order-table">
            <ClipboardList /> Order Details
          </Link>
        </li>
        <li>
          <Link to="/admin/a-book">
            <BookOpen /> A Book
          </Link>
        </li>
        <li>
          <Link to="/admin/b-book">
            <BookOpen /> B Book
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-user">
            <Users /> Manage User
          </Link>
        </li>
        <li>
          <Link to="/admin/withdraw">
            <ArrowDownToLine /> Withdraw
          </Link>
        </li>
        <li>
          <Link to="/admin/deposit">
            <ArrowUpFromLine /> Deposit
          </Link>
        </li>
        <li>
          <Link to="/admin/withdrawal-list">
            <List /> Withdrawal Bank Details
          </Link>
        </li>
        <li>
          <Link to="/admin/deposit-list">
            <List /> Deposit Bank Details
          </Link>
        </li>
        <li>
          <Link to="/admin/copytrading">
            <Copy /> Copy Trading
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-leads">
            <Users /> Manage Leads
          </Link>
        </li>
        <li>
          <Link to="/admin/user-management">
            <Users /> User Management
          </Link>
        </li>
        <li>
          <Link to="/admin/user-documents">
            <Paperclip /> User Documents
          </Link>
        </li>
        <li>
          <Link to="/admin/abook-margin">
            <DollarSign /> A Book Margin
          </Link>
        </li>
        <li>
          <Link to="/admin/bbook-margin">
            <DollarSign /> B Book Margin
          </Link>
        </li>
        <li>
          <Link to="/admin/analyst">
            <BarChart /> Analyst View
          </Link>
        </li>
        <li>
          <Link to="/admin/active-user">
            <UserCheck /> Active User
          </Link>
        </li>
        <li>
          <Link to="/admin/subscription-panel">
            <DollarSign /> Subscription
          </Link>
        </li>
      </ul>

      <div>
        <AdminLogout />
      </div>
    </div>
  );
};

export default BSidebar;
