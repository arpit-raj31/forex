import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  File as FilePdf,
  Search as SearchIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPenToSquare } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const orders = [
  {
    sNo: 1,
    acId: 10001,
    email: "user1@example.com",
    token: "T1WRDG1",
    dateTime: "2024-10-15 08:54:06",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 100,
    status: "success",
    reason: "Initial Deposit",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 2,
    acId: 10002,
    email: "user2@example.com",
    token: "T1WRDG2",
    dateTime: "2024-10-15 09:00:00",
    method: "Withdrawal",
    acinfo: "Account Details",
    amnt: 50,
    status: "success",
    reason: "Personal Expense",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 3,
    acId: 10003,
    email: "user3@example.com",
    token: "T1WRDG3",
    dateTime: "2024-10-15 09:30:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 200,
    status: "failed",
    reason: "Insufficient Funds",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 4,
    acId: 10004,
    email: "user4@example.com",
    token: "T1WRDG4",
    dateTime: "2024-10-15 10:00:00",
    method: "Deposit",
    acinfo: "Account Details",
    amnt: 300,
    status: "success",
    reason: "Investment",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 5,
    acId: 10005,
    email: "user5@example.com",
    token: "T1WRDG5",
    dateTime: "2024-10-15 10:30:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 150,
    status: "success",
    reason: "Follow-up Transfer",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 6,
    acId: 10006,
    email: "user6@example.com",
    token: "T1WRDG6",
    dateTime: "2024-10-15 11:00:00",
    method: "Withdrawal",
    acinfo: "Account Details",
    amnt: 75,
    status: "success",
    reason: "Emergency Fund",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 7,
    acId: 10007,
    email: "user7@example.com",
    token: "T1WRDG7",
    dateTime: "2024-10-15 11:30:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 500,
    status: "failed",
    reason: "Account Suspended",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 8,
    acId: 10008,
    email: "user8@example.com",
    token: "T1WRDG8",
    dateTime: "2024-10-15 12:00:00",
    method: "Deposit",
    acinfo: "Account Details",
    amnt: 400,
    status: "success",
    reason: "New Investment",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 9,
    acId: 10009,
    email: "user9@example.com",
    token: "T1WRDG9",
    dateTime: "2024-10-15 12:30:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 250,
    status: "success",
    reason: "Monthly Contribution",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 10,
    acId: 10010,
    email: "user10@example.com",
    token: "T1WRDG10",
    dateTime: "2024-10-15 13:00:00",
    method: "Withdrawal",
    acinfo: "Account Details",
    amnt: 120,
    status: "success",
    reason: "Travel Expense",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 11,
    acId: 10011,
    email: "user11@example.com",
    token: "T1WRDG11",
    dateTime: "2024-10-15 13:30:00",
    method: "Deposit",
    acinfo: "Account Details",
    amnt: 350,
    status: "success",
    reason: "Savings",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 12,
    acId: 10012,
    email: "user12@example.com",
    token: "T1WRDG12",
    dateTime: "2024-10-15 14:00:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 90,
    status: "failed",
    reason: "Technical Issues",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 13,
    acId: 10013,
    email: "user13@example.com",
    token: "T1WRDG13",
    dateTime: "2024-10-15 14:30:00",
    method: "Withdrawal",
    acinfo: "Account Details",
    amnt: 60,
    status: "success",
    reason: "Personal Savings",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 14,
    acId: 10014,
    email: "user14@example.com",
    token: "T1WRDG14",
    dateTime: "2024-10-15 15:00:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 80,
    status: "success",
    reason: "Investment Fund",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 15,
    acId: 10015,
    email: "user15@example.com",
    token: "T1WRDG15",
    dateTime: "2024-10-10 15:30:00",
    method: "Deposit",
    acinfo: "Account Details",
    amnt: 220,
    status: "success",
    reason: "Business Investment",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 16,
    acId: 10016,
    email: "user16@example.com",
    token: "T1WRDG16",
    dateTime: "2024-10-5 16:00:00",
    method: "Withdrawal",
    acinfo: "Account Details",
    amnt: 30,
    status: "success",
    reason: "Cash Withdrawal",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 17,
    acId: 10017,
    email: "user17@example.com",
    token: "T1WRDG17",
    dateTime: "2024-10-4 16:30:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 400,
    status: "success",
    reason: "Salary",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 18,
    acId: 10018,
    email: "user18@example.com",
    token: "T1WRDG18",
    dateTime: "2024-10-3 17:00:00",
    method: "Withdrawal",
    acinfo: "Account Details",
    amnt: 300,
    status: "failed",
    reason: "Bank Error",
    type: "out",
    action: <FaPenToSquare />,
  },
  {
    sNo: 19,
    acId: 10019,
    email: "user19@example.com",
    token: "T1WRDG19",
    dateTime: "2024-10-15 17:30:00",
    method: "Deposit",
    acinfo: "Account Details",
    amnt: 150,
    status: "success",
    reason: "Emergency Fund",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 20,
    acId: 10020,
    email: "user20@example.com",
    token: "T1WRDG20",
    dateTime: "2024-10-15 18:00:00",
    method: "PAMM Transfer",
    acinfo: "Account Details",
    amnt: 500,
    status: "success",
    reason: "Investment",
    type: "in",
    action: <FaPenToSquare />,
  },
  {
    sNo: 1,
    acId: "ACC12345",
    email: "user@example.com",
    token: "TOKEN123",
    dateTime: "2023-10-16",
    method: "Bank Transfer",
    acinfo: "Account Info",
    amnt: "1000",
    status: "Verified",
    reason: "N/A",
    type: "Withdrawal",
    action: <FaPenToSquare />,
  },
];

const Withdraw = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orderList, setOrderList] = useState(orders);

  const filteredOrders = orders.filter(
    (order) =>
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.acId.toString().includes(searchTerm)
  );

  const handleAmountChange = (index, newAmount) => {
    const updatedOrders = [...orders];
    updatedOrders[index].amnt = newAmount; // Update the specific order's amount
    setOrderList(updatedOrders); // Update the state
  };

  const handleTypeChange = (index, newType) => {
    const updatedOrders = [...orderList];
    updatedOrders[index].type = newType; // Update the `type` for the specific order
    setOrderList(updatedOrders); // Update the state
    console.log(`Type for Order ${index + 1} changed to: ${newType}`);
    // Optionally, you can send the updated data to the backend here
};


  const downloadCSV = () => {
    const csvRows = [
      [
        "S.No",
        "Account ID",
        "Email",
        "Token",
        "Date & Time",
        "Method",
        "Account Info",
        "Amount",
        "Status",
        "Reason",
        "Type",
      ],
      ...orders.map((order) => [
        order.sNo,
        order.acId,
        order.email,
        order.token,
        order.dateTime,
        order.method,
        order.acinfo,
        order.amnt,
        order.status,
        order.reason,
        order.type,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "orders.csv");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "orders.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 10);
    doc.autoTable({
      head: [
        [
          "S.No",
          "Account ID",
          "Email",
          "Token",
          "Date & Time",
          "Method",
          "Account Info",
          "Amount",
          "Status",
          "Reason",
          "Type",
        ],
      ],
      body: orders.map((order) => [
        order.sNo,
        order.acId,
        order.email,
        order.token,
        order.dateTime,
        order.method,
        order.acinfo,
        order.amnt,
        order.status,
        order.reason,
        order.type,
      ]),
    });
    doc.save("orders.pdf");
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    console.log(`Status for Order ${index + 1} changed to: ${newStatus}`);
    // Send updated order to backend if necessary
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Withdrawal</h1>

      <div className="flex gap-2">
        {/* Download Buttons */}
        <div className="flex gap-2 mr-[60rem]">
          <div className="flex flex-col">
            <label
              htmlFor="fromDate"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              From:
            </label>
            <input
              type="date"
              id="fromDate"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="toDate"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              To:
            </label>
            <input
              type="date"
              id="toDate"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by Customer Name"
          className="max-w-sm px-2 py-1 border rounded text-sm mt-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="outline-none px-2 py-1 border rounded flex items-center text-sm mt-6">
          <SearchIcon className="h-4 w-4 mr-1" />
          <span className="sr-only">Search</span>
        </button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              {[
                "S.No",
                "Account ID",
                "Email",
                "Token",
                "Date & Time",
                "Method",
                "Account Info",
                "Amount",
                "Status",
                "Reason",
                "Type",
              ].map((header) => (
                <th key={header} className="px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-4 py-2 border">{order.sNo}</td>
                <td className="px-4 py-2 border">{order.acId}</td>
                <td className="px-4 py-2 border">{order.email}</td>
                <td className="px-4 py-2 border">{order.token}</td>
                <td className="px-4 py-2 border">{order.dateTime}</td>
                <td className="px-4 py-2 border">{order.method}</td>
                <td className="px-4 py-2 border">{order.acinfo}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    value={order.amnt}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border text-center">
                  <div className="relative inline-block w-full">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className={`w-full py-2 px-3 rounded-lg font-semibold text-white focus:outline-none transition-all duration-300 ${
                        order.status === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : order.status === "failed"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      <option
                        value="success"
                        className="bg-green-500 text-white"
                      >
                        Success
                      </option>
                      <option value="failure" className="bg-red-500 text-white">
                        Failure
                      </option>
                      <option
                        value="pending"
                        className="bg-yellow-500 text-white"
                      >
                        Pending
                      </option>
                    </select>
                  </div>
                </td>
                <td className="px-4 py-2 border">{order.reason}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={order.type}
                    onChange={(e) => handleTypeChange(index, e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="in">In</option>
                    <option value="out">Out</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className="border rounded gap-2 px-4 py-2 flex items-center"
          onClick={downloadCSV}
        >
          <FileText className="size-4" />
          Download CSV
        </button>
        <button
          className="border rounded gap-2 px-4 py-2 flex items-center"
          onClick={downloadExcel}
        >
          <FileSpreadsheet className="size-4" />
          Download Excel
        </button>
        <button
          className="border rounded gap-2 px-4 py-2 flex items-center"
          onClick={downloadPDF}
        >
          <FilePdf className="size-4" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
