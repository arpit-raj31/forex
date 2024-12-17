import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  File as FilePdf,
  Search as SearchIcon,
  Edit,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPenToSquare } from "react-icons/fa6";

const userData = [
  {
    sNo: 10,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 11,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 12,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 13,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  }, // Add more user data...
  {
    sNo: 14,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 15,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 16,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 17,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 18,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 10,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 19,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 20,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 21,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 22,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 23,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 24,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 25,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 26,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
  {
    sNo: 27,
    acId: 10010,
    name: "Rohan",
    email: "rahan@gmail.com",
    phone: 9854731262,
    emplyname: "Jagdish",
    leadtype: "",
    date: "2024-10-15",
    descr: "gdgdfhbfgbnfgh",
    action: <FaPenToSquare />,
  },
];

const ManageLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [formVisible1, setFormVisible1] = useState(false);

  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({
    emplyname: "",
    leadtype: "",
    date: "",
    descr: "",
  });

  const filteredUsers = userData.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.acId.toString().includes(searchTerm)
  );

  const handleEditClick = (userData) => {
    setEditData({
      emplyname: userData.emplyname,
      leadtype: userData.leadtype,
      date: userData.date,
      descr: userData.descr,
    });
    setEditId(userData.sNo); // Use uid to identify which row to edit
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

  const downloadCSV = () => {
    const csvRows = [
      [
        "S.No",
        "Account ID",
        "Name",
        "Email",
        "Phone",
        "Employee Name",
        "Lead Type",
        "Date",
        "Description",
      ],
      ...userData.map((user) => [
        user.sNo,
        user.acId,
        user.name,
        user.email,
        user.phone,
        user.emplyname,
        user.leadtype,
        user.date,
        user.descr,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users.csv");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(userData);
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
    doc.text("User Data", 14, 10);
    doc.autoTable({
      head: [
        [
          "S.No",
          "Account ID",
          "Name",
          "Email",
          "Phone",
          "Employee Name",
          "Lead Type",
          "Date",
          "Description",
        ],
      ],
      body: userData.map((user) => [
        user.sNo,
        user.acId,
        user.name,
        user.email,
        user.phone,
        user.emplyname,
        user.leadtype,
        user.date,
        user.descr,
      ]),
    });
    doc.save("users.pdf");
  };

  const addLeadHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const leadData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        employee: formData.employee,
        leadType: formData.leadType,
        followupDate: formData.followupDate,
        description: formData.description,
      };

      // Validate fields
      if (
        !leadData.username ||
        !leadData.email ||
        !leadData.phone ||
        !leadData.employee ||
        !leadData.leadType ||
        !leadData.followupDate ||
        !leadData.description
      ) {
        alert("All fields are required. Please complete the form.");
        return;
      }

      // Make API call to save lead data
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Lead added successfully!");
        setFormVisible(false); // Close the form
      } else {
        const error = await response.json();
        alert(`Failed to add lead: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      alert("An error occurred while adding the lead. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Data</h1>

      <div>
        <button
          onClick={() => setFormVisible(true)}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition mr-10"
        >
          Add Lead
        </button>
        <button
          onClick={() => setFormVisible1(true)}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add BulkLead
        </button>

        {formVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-2 gap-5 animate-fade-in">
              <span
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
                onClick={() => setFormVisible(false)}
              >
                &times;
              </span>

              <h2 className="col-span-2 text-center text-lg font-bold text-gray-800 mb-5">
                Add Lead Form
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
                  E-mail:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter the email ID"
                  // value={formData.email}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter the phone number"
                  // value={formData.phone}
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
                  Lead Type:
                </label>
                <select
                  name="leadType"
                  // value={formData.leadType}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">--Select Lead Type--</option>
                  {/* Add lead type options dynamically */}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Followup Date:
                </label>
                <input
                  type="date"
                  name="followupDate"
                  // value={formData.followupDate}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 font-semibold text-gray-600">
                  Description:
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  // value={formData.description}
                  // onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <button
                type="submit"
                className="col-span-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={addLeadHandler}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {formVisible1 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-1 gap-5 animate-fade-in">
              <span
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
                onClick={() => setFormVisible1(false)}
              >
                &times;
              </span>

              <h2 className="text-center text-lg font-bold text-gray-800 mb-5">
                Bulk Add Form
              </h2>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Upload CSV/PDF:
                </label>
                <input
                  type="file"
                  name="bulkFile"
                  accept=".csv, .pdf"
                  onChange=""
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick=""
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>

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
                "Name",
                "Email",
                "Phone",
                "Employee Name",
                "Lead Type",
                "Date",
                "Description",
                "Action",
              ].map((header) => (
                <th key={header} className="px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-4 py-2 border">{user.sNo}</td>
                <td className="px-4 py-2 border">{user.acId}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">{user.emplyname}</td>
                <td className="px-4 py-2 border">{user.leadtype}</td>
                <td className="px-4 py-2 border">{user.date}</td>
                <td className="px-4 py-2 border">{user.descr}</td>

                <td className="px-4 py-2 border text-center">
                  <button onClick={() => handleEditClick(user)}>
                    <Edit className="cursor-pointer" />
                  </button>
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
                Edit Order
              </h2>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Employee Name:
                </label>
                <input
                  type="text"
                  name="emplynamet"
                  value={editData.emplyname}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                 Lead Type:
                </label>
                <input
                  type="number"
                  name="leadtype"
                  value={editData.leadtype}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                 Date:
                </label>
                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
               Description:
                </label>
                <input
                  type="text"
                  name="description"
                  value={editData.descr}
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

export default ManageLeads;
