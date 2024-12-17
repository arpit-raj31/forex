import React, { useState } from "react";
import CreateUserModal from "./CreateUserModal";
import AddUserModal from "./AddUserModal";
import {
  FileText,
  FileSpreadsheet,
  File as FilePdf,
  RefreshCw,
  PlusCircle,
  Edit,
  Search as SearchIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const users = [
  {
    sNo: 14,
    action: "demo",
    acId: 10014,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "xtreme",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Not Verified",
    fund: 11599.89,
    balance: 11691.33,
    book: "B Book",
  },
  {
    sNo: 26,
    action: "TEST",
    acId: 10001,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "1234",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Verified",
    fund: 12237.74,
    balance: 12300.8,
    book: "B Book",
  },
  {
    sNo: 30,
    action: "TEST",
    acId: 10002,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "kHTec50N",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Verified",
    fund: 2518.14,
    balance: 2549.69,
    book: "B Book",
  },
  {
    sNo: 33,
    action: "TEST",
    acId: 10008,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "DijIyewn",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Verified",
    fund: 4773.06,
    balance: 4975.48,
    book: "B Book",
  },
  {
    sNo: 35,
    action: "TEST",
    acId: 10009,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "A7vOMlZ1",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Not Verified",
    fund: 5393.71,
    balance: 5413.71,
    book: "B Book",
  },
  {
    sNo: 36,
    action: "TEST n",
    acId: 10010,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "Myplcat4",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Not Verified",
    fund: 4898.28,
    balance: 6041.67,
    book: "A Book",
  },
  {
    sNo: 37,
    action: "TEST",
    acId: 10011,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "Tel53nEb",
    invPassword: "",
    emailStatus: "Not Verified",
    docStatus: "Not Verified",
    fund: 5018.51,
    balance: 5036.21,
    book: "B Book",
  },
  {
    sNo: 38,
    action: "TEST",
    acId: 10006,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "n6JDMg2m",
    invPassword: "dfghh",
    emailStatus: "Verified",
    docStatus: "Not Verified",
    fund: 2377.03,
    balance: 2377.03,
    book: "B Book",
  },
  {
    sNo: 39,
    action: "TEST",
    acId: 10012,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "Ev0BYDGc",
    invPassword: "dfhdhf",
    emailStatus: "Verified",
    docStatus: "Verified",
    fund: -24.19,
    balance: -24.19,
    book: "B Book",
  },
  {
    sNo: 42,
    action: "Mani",
    acId: 10042,
    name: "test.bizglobal@gmail.com",
    email: "bizglobal@gmail.com",
    password: "BmfgpVFq",
    invPassword: "",
    emailStatus: "Verified",
    docStatus: "Verified",
    fund: 5.0,
    balance: 5.0,
    book: "B Book",
  },
];

const ManageUser = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateUserFormVisible, setCreateUserForm] = useState(false);

  const createUser = (newUserData) => {
    // form data:
    console.log("Creating user with data:", newUserData);
    //  API
  };

  const handleButtonClick = (userId) => {
    setSelectedItem((prevSelected) =>
      prevSelected === userId ? null : userId
    );
  };

  const handleToggleEmailStatus = (userId, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.sNo === userId
          ? {
              ...user,
              emailStatus: newStatus, // Update emailStatus based on the selected value
            }
          : user
      )
    );
  };

  const handleToggleDocStatus = (userId, selectedStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.sNo === userId
          ? {
              ...user,
              docStatus: selectedStatus,
            }
          : user
      )
    );
  };

  const handleBookChange = (userId, selectedBook) => {
    const user = users.find((u) => u.sNo === userId);
    if (user) {
      user.book = selectedBook;
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download as CSV
  const downloadCSV = () => {
    const csvRows = [
      [
        "S.No",
        "Deposit / Withdraw",
        "Name",
        "AC. ID",
        "Email",
        "Password",
        "Inv. Password",
        "E-Mail",
        "Document",
        "Fund",
        "Balance",
        "Book",
      ],
      ...users.map((user) => [
        user.sNo,
        user.action,
        user.name,
        user.acId,
        user.email,
        user.password,
        user.invPassword,
        user.emailStatus,
        user.docStatus,
        user.fund,
        user.balance,
        user.book,
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
          "Deposit / Withdraw",
          "Name",
          "AC. ID",
          "Email",
          "Password",
          "Inv. Password",
          "E-Mail",
          "Document",
          "Fund",
          "Balance",
          "Book",
        ],
      ],
      body: users.map((user) => [
        user.sNo,
        user.action,
        user.name,
        user.acId,
        user.email,
        user.password,
        user.invPassword,
        user.emailStatus,
        user.docStatus,
        user.fund,
        user.balance,
        user.book,
      ]),
    });
    doc.save("users.pdf");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Manage User</h1>

      <div className="flex gap-2">
        {/* Download Buttons */}
        <div className="flex items-center gap-5 mr-[55rem]">
          <button
            onClick={() => setCreateUserForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="w-5 h-5" /> Create Account
          </button>
          {/* Create User Modal */}
          {isCreateUserFormVisible && (
            <CreateUserModal
              setCreateUserForm={setCreateUserForm}
              createUser={createUser}
            />
          )}


          <AddUserModal/>
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <PlusCircle className="w-5 h-5" /> 
          </button> */}

          
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            <RefreshCw className="w-5 h-5" /> Refresh
          </button>
        </div>

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
              <th className="px-4 py-2 border">Deposit / Withdraw</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">AC. ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Password</th>
              <th className="px-4 py-2 border">Inv. Password</th>
              <th className="px-4 py-2 border">E-Mail</th>
              <th className="px-4 py-2 border">Document</th>
              <th className="px-4 py-2 border">Fund</th>
              <th className="px-4 py-2 border">Balance</th>
              <th className="px-4 py-2 border">Book</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.sNo}</td>
                <td>{user.action}</td>
                <td>{user.name}</td>
                <td>{user.acId}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.invPassword}</td>

                {/* Email Status */}
                <td className="px-2 py-1 text-center w-[150px]">
                  <select
                    className={`px-2 py-1 rounded w-full ${
                      user.emailStatus === "Verified"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                    value={user.emailStatus}
                    onChange={(e) =>
                      handleToggleEmailStatus(user.sNo, e.target.value)
                    }
                  >
                    <option value="Verified" className="text-black">
                      Verified
                    </option>
                    <option value="Not Verified" className="text-black">
                      Not Verified
                    </option>
                  </select>
                </td>

                {/* Document Status */}
                <td className="px-2 py-1 text-center w-[150px]">
                  <select
                    className={`px-2 py-1 rounded w-full ${
                      user.docStatus === "Verified"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                    value={user.docStatus}
                    onChange={(e) =>
                      handleToggleDocStatus(user.sNo, e.target.value)
                    }
                  >
                    <option value="Verified" className="text-black">
                      Verified
                    </option>
                    <option value="Not Verified" className="text-black">
                      Not Verified
                    </option>
                  </select>
                </td>

                <td>{user.fund}</td>
                <td>{user.balance}</td>

                {/* Book Status */}
                <td className="px-2 py-1 text-center w-[150px]">
                  <select
                    className={`px-2 py-1 rounded w-full ${
                      user.book === "A Book"
                        ? "bg-aBookYellow text-black"
                        : "bg-bBookYellow text-black"
                    }`}
                    value={user.book}
                    onChange={(e) => handleBookChange(user.sNo, e.target.value)}
                  >
                    <option value="A Book">A Book</option>
                    <option value="B Book">B Book</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default ManageUser;
