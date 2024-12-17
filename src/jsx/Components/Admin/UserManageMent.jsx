import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Edit , 
  Trash ,
  File as FilePdf,
  Search as SearchIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DeleteButtonModal from "./DeleteButtonModal";

const UserManageMent = () => {
  const users = [
    {
      sNo: 1,
      userName: "JohnDoe",
      password: "Password123",
      userType: "Admin",
      action: "Edit/Delete",
    },
    {
      sNo: 2,
      userName: "JaneSmith",
      password: "Jane@2023",
      userType: "User",
      action: "View",
    },
    {
      sNo: 3,
      userName: "AlexBrown",
      password: "Alex@Secure1",
      userType: "Moderator",
      action: "Edit",
    },
    {
      sNo: 4,
      userName: "LisaWhite",
      password: "Lisa#6789",
      userType: "User",
      action: "View/Delete",
    },
    {
      sNo: 5,
      userName: "TomClark",
      password: "TomC!2024",
      userType: "Admin",
      action: "Edit/Delete",
    },
    {
      sNo: 6,
      userName: "SamGreen",
      password: "Sam@Sample9",
      userType: "User",
      action: "View",
    },
    {
      sNo: 7,
      userName: "EmmaJones",
      password: "Emma*Pass20",
      userType: "Moderator",
      action: "Edit",
    },
    {
      sNo: 8,
      userName: "LiamHill",
      password: "Liam!Secure",
      userType: "User",
      action: "View/Delete",
    },
    {
      sNo: 9,
      userName: "MiaBlack",
      password: "Mia#Test45",
      userType: "Admin",
      action: "Edit/Delete",
    },
    {
      sNo: 10,
      userName: "NoahGray",
      password: "Noah@Pass1",
      userType: "User",
      action: "View",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [modalRowIndex, setModalRowIndex] = useState(null);
  const [user, setUser] = useState(users);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({
    userName: "",
    password: "",
    userType: "",
  });

  const handleEditClick = (users) => {
    setEditData({
      userName: users.userName,
      password: users.password,
      userType: users.userType,
    });
    setEditId(users.sNo); // Use uid to identify which row to edit
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Add functionality to save edited data
    console.log("Updated Data:", editData);
    setEditId(""); // Close the modal
  };

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index) => {
    const updatedUsers = user.filter((_, i) => i !== index);
    setUser(updatedUsers);
    setModalRowIndex(null);
  };

  const downloadCSV = () => {
    const csvRows = [
      ["S.No", "Username", "Password", "User Type", "Action"],
      ...users.map((user) => [
        user.sNo,
        user.userName,
        user.password,
        user.userType,
        user.action,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users.csv");
  };

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User Management", 14, 10);
    doc.autoTable({
      head: [["S.No", "Username", "Password", "User Type", "Action"]],
      body: users.map((user) => [
        user.sNo,
        user.userName,
        user.password,
        user.userType,
        user.action,
      ]),
    });
    doc.save("users.pdf");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div>
        <button
          onClick={() => setFormVisible(true)}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition mr-10"
        >
          Add User
        </button>
        {formVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-1 gap-5 animate-fade-in">
              <span
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
                onClick={() => setFormVisible(false)}
              >
                &times;
              </span>

              <h2 className="text-center text-lg font-bold text-gray-800 mb-5">
                User Management
              </h2>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  User Name:
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter the user name"
                  // value={formData.username}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  // value={formData.password}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Employee:
                </label>
                <select
                  name="employee"
                  // value={formData.employee}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">--Select Employee--</option>
                  {/* Add employee options dynamically */}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  User Type:
                </label>
                <select
                  name="userType"
                  // value={formData.userType}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">--Select User Type--</option>
                  {/* Add user type options dynamically */}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition"
                  onClick={() => setFormVisible(false)}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                  // onClick={handleUserSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 py-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by Username or User Type"
            className="max-w-sm p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="outline-none p-2 border rounded flex items-center">
            <SearchIcon className="size-4" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              {["S.No", "Username", "Password", "User Type", "Action"].map(
                (header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-4 py-2 border">{user.sNo}</td>
                <td className="px-4 py-2 border">{user.userName}</td>
                <td className="px-4 py-2 border">{user.password}</td>
                <td className="px-4 py-2 border">{user.userType}</td>
                <td className="px-4 py-2 border flex gap-2 justify-center items-center">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>
                  <button onClick={() => handleEditClick(user)}>
                    <Edit className="cursor-pointer" />
                  </button>
                  <Trash
                    className="cursor-pointer"
                    onClick={() => setModalRowIndex(index)}
                  />
                  {modalRowIndex === index && (
                    <DeleteButtonModal
                      isOpen={true}
                      message="Are you sure you want to perform this action?"
                      onConfirm={() => handleDelete(index)}
                      onCancel={() => setModalRowIndex(null)}
                      confirmText="Confirm"
                      cancelText="Cancel"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-2 gap-5 animate-fade-in">
              <span
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
                onClick={() => setEditId("")}
              >
                &times;
              </span>

              <h2 className="col-span-2 text-center text-lg font-bold text-gray-800 mb-5">
                Edit User
              </h2>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  User Name:
                </label>
                <input
                  type="text"
                  name="username"
                  value={editData.userName}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                 Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                 UserType:
                </label>
                <input
                  type="text"
                  name="text"
                  value={editData.userType}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <button
                type="submit"
                className="col-span-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
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

export default UserManageMent;
