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

// Initial Users Data
const usersData = [
  {
    sNo: 1,
    acId: 10001,
    email: "user1@example.com",
    token: "T1WRDG1",
    dateTime: "2024-10-15 08:54:06",
    method: "PAMM Transfer",
    paymentprf: "PayPal",
    amnt: 100,
    status: "success",
  },
  {
    sNo: 2,
    acId: 10002,
    email: "user2@example.com",
    token: "T1WRDG2",
    dateTime: "2024-10-15 09:10:12",
    method: "Bank Transfer",
    paymentprf: "Bank Account",
    amnt: 500,
    status: "pending",
  },
  {
    sNo: 3,
    acId: 10003,
    email: "user3@example.com",
    token: "T1WRDG3",
    dateTime: "2024-10-15 09:35:20",
    method: "Internal Transfer",
    paymentprf: "Debit Card",
    amnt: 250,
    status: "failed",
  },
  {
    sNo: 4,
    acId: 10004,
    email: "user4@example.com",
    token: "T1WRDG4",
    dateTime: "2024-10-15 10:00:00",
    method: "Bank Transfer",
    paymentprf: "Credit Card",
    amnt: 90304,
    status: "success",
  },
  {
    sNo: 5,
    acId: 10005,
    email: "user5@example.com",
    token: "T1WRDG5",
    dateTime: "2024-10-15 10:45:30",
    method: "PAMM Transfer",
    paymentprf: "PayPal",
    amnt: 750,
    status: "success",
  },
  {
    sNo: 6,
    acId: 10006,
    email: "user6@example.com",
    token: "T1WRDG6",
    dateTime: "2024-10-15 11:20:05",
    method: "Copy Trading Transfer",
    paymentprf: "Wire Transfer",
    amnt: 10200,
    status: "pending",
  },
  {
    sNo: 7,
    acId: 10007,
    email: "user7@example.com",
    token: "T1WRDG7",
    dateTime: "2024-10-15 12:05:45",
    method: "Internal Transfer",
    paymentprf: "Bank Account",
    amnt: 320,
    status: "failed",
  },
  {
    sNo: 8,
    acId: 10008,
    email: "user8@example.com",
    token: "T1WRDG8",
    dateTime: "2024-10-15 12:45:10",
    method: "PAMM Transfer",
    paymentprf: "PayPal",
    amnt: 1050,
    status: "success",
  },
  {
    sNo: 9,
    acId: 10009,
    email: "user9@example.com",
    token: "T1WRDG9",
    dateTime: "2024-10-15 13:15:25",
    method: "Bank Transfer",
    paymentprf: "Wire Transfer",
    amnt: 4900,
    status: "pending",
  },
  {
    sNo: 10,
    acId: 10010,
    email: "user10@example.com",
    token: "T1WRDG10",
    dateTime: "2024-10-15 13:55:35",
    method: "Copy Trading Transfer",
    paymentprf: "Credit Card",
    amnt: 860,
    status: "failed",
  },
  {
    sNo: 11,
    acId: 10011,
    email: "user11@example.com",
    token: "T1WRDG11",
    dateTime: "2024-10-15 14:30:50",
    method: "Bank Transfer, Copy Trading Transfer",
    paymentprf: "Bank Account",
    amnt: 4500,
    status: "success",
  },
  {
    sNo: 12,
    acId: 10012,
    email: "user12@example.com",
    token: "T1WRDG12",
    dateTime: "2024-10-15 15:05:15",
    method: "PAMM Transfer",
    paymentprf: "PayPal",
    amnt: 780,
    status: "success",
  },
  {
    sNo: 13,
    acId: 10013,
    email: "user13@example.com",
    token: "T1WRDG13",
    dateTime: "2024-10-15 15:40:35",
    method: "Bank Transfer",
    paymentprf: "Wire Transfer",
    amnt: 300,
    status: "pending",
  },
  {
    sNo: 14,
    acId: 10014,
    email: "user14@example.com",
    token: "T1WRDG14",
    dateTime: "2024-10-15 16:10:45",
    method: "Copy Trading Transfer",
    paymentprf: "Credit Card",
    amnt: 520,
    status: "failed",
  },
  {
    sNo: 15,
    acId: 10015,
    email: "user15@example.com",
    token: "T1WRDG15",
    dateTime: "2024-10-15 16:50:55",
    method: "Internal Transfer",
    paymentprf: "Debit Card",
    amnt: 600,
    status: "success",
  },
  {
    sNo: 16,
    acId: 10016,
    email: "user16@example.com",
    token: "T1WRDG16",
    dateTime: "2024-10-15 17:25:20",
    method: "PAMM Transfer",
    paymentprf: "PayPal",
    amnt: 900,
    status: "pending",
  },
  {
    sNo: 17,
    acId: 10017,
    email: "user17@example.com",
    token: "T1WRDG17",
    dateTime: "2024-10-15 17:55:30",
    method: "Bank Transfer, Internal Transfer",
    paymentprf: "Bank Account",
    amnt: 1050,
    status: "success",
  },
  {
    sNo: 18,
    acId: 10018,
    email: "user18@example.com",
    token: "T1WRDG18",
    dateTime: "2024-10-15 18:25:45",
    method: "Copy Trading Transfer",
    paymentprf: "Wire Transfer",
    amnt: 1350,
    status: "failed",
  },
  {
    sNo: 19,
    acId: 10019,
    email: "user19@example.com",
    token: "T1WRDG19",
    dateTime: "2024-10-15 19:00:10",
    method: "Internal Transfer",
    paymentprf: "Credit Card",
    amnt: 1200,
    status: "success",
  },
  {
    sNo: 20,
    acId: 10020,
    email: "user20@example.com",
    token: "T1WRDG20",
    dateTime: "2024-10-15 19:30:30",
    method: "Bank Transfer",
    paymentprf: "Debit Card",
    amnt: 800,
    status: "pending",
  },

  // Add more users as needed
];

const Deposit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(usersData); // Manage users state

  // Function to update the status of a specific user
  const updateStatus = (index, newStatus) => {
    const updatedUsers = [...users]; // Copy the users array to avoid direct mutation
    const user = updatedUsers[index]; // Get the user to update

    user.status = newStatus; // Update the status

    setUsers(updatedUsers); // Update the state with the new users array
  };

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download as CSV
  const downloadCSV = () => {
    const csvRows = [
      [
        "S.No",
        "Account ID",
        "Email ID",
        "Token",
        "Date & Time",
        "Payment Proof",
        "Method",
        "Amount",
        "Status",
      ],
      ...users.map((user) => [
        user.sNo,
        user.acId,
        user.email,
        user.token,
        user.dateTime,
        user.method,
        user.paymentprf,
        user.amnt,
        user.status,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users.csv");
  };

  // Download as Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "users.xlsx");
  };

  // Download as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Users Report", 14, 10);
    doc.autoTable({
      head: [
        [
          "S.No",
          "Account ID",
          "Email ID",
          "Token",
          "Date & Time",
          "Payment Proof",
          "Method",
          "Amount",
          "Status",
        ],
      ],
      body: users.map((user) => [
        user.sNo,
        user.acId,
        user.email,
        user.token,
        user.dateTime,
        user.method,
        user.paymentprf,
        user.amnt,
        user.status,
      ]),
    });
    doc.save("users.pdf");
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...usersData];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    console.log(`Status for Order ${index + 1} changed to: ${newStatus}`);
    // Send updated order to backend if necessary
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Deposit</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by Customer Name"
          className="max-w-sm p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="outline-none p-2 border rounded flex items-center">
          <SearchIcon className="size-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Account ID</th>
              <th className="px-4 py-2 border">Email ID</th>
              <th className="px-4 py-2 border">Token</th>
              <th className="px-4 py-2 border">Date & Time</th>
              <th className="px-4 py-2 border">Payment Proof</th>
              <th className="px-4 py-2 border">Method</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.sNo}</td>
                <td>{user.acId}</td>
                <td>{user.email}</td>
                <td>{user.token}</td>
                <td>{user.dateTime}</td>
                <td>{user.method}</td>
                <td>{user.paymentprf}</td>
                <td>{user.amnt}</td>
                <td className="px-4 py-2 border text-center">
                  <div className="relative inline-block w-full">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className={`w-full py-2 px-3 rounded-lg font-semibold text-white focus:outline-none transition-all duration-300 ${
                        user.status === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : user.status === "failed"
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
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

export default Deposit;
