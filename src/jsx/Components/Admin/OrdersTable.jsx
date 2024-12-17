import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  File as FilePdf,
  Edit,
  Search as SearchIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const followerData = {
  101: [
    {
      followername: "John Doe",
      accountId: "ACC123",
      mamshare: "50%",
      followershare: "50%",
      date: "2023-01-01",
      editshare: <Edit />,
    },
    {
      followername: "Jane Smith",
      accountId: "ACC456",
      mamshare: "60%",
      followershare: "40%",
      date: "2023-02-01",
      editshare: <Edit />,
    },
  ],
  102: [
    {
      followername: "Robert Brown",
      accountId: "ACC789",
      mamshare: "70%",
      followershare: "30%",
      date: "2023-03-01",
      editshare: <Edit />,
    },
    {
      followername: "Emily Davis",
      accountId: "ACC101",
      mamshare: "80%",
      followershare: "20%",
      date: "2023-04-01",
      editshare: <Edit />,
    },
  ],
  103: [
    {
      followername: "Michael Johnson",
      accountId: "ACC102",
      mamshare: "90%",
      followershare: "10%",
      date: "2023-05-01",
      editshare: <Edit />,
    },
  ],
};

const orders = [
  {
    userId: "101",
    customerName: "Alice Smith",
    accountId: "AC10123",
    fund: "$7500.00",
    balance: "$5000.00",
    equity: "$6000.00",
    marginLevel: "20%",
    groupName: "Gold",
    totalPnl: "$800.00",
  },
  {
    userId: "102",
    customerName: "Bob Johnson",
    accountId: "AC10234",
    fund: "$6200.00",
    balance: "$4000.00",
    equity: "$4500.00",
    marginLevel: "18%",
    groupName: "Silver",
    totalPnl: "$650.00",
  },
  {
    userId: "103",
    customerName: "Charlie Brown",
    accountId: "AC10345",
    fund: "$5400.00",
    balance: "$3600.00",
    equity: "$4100.00",
    marginLevel: "22%",
    groupName: "Bronze",
    totalPnl: "$550.00",
  },
  {
    userId: "104",
    customerName: "Diana Prince",
    accountId: "AC10456",
    fund: "$8200.00",
    balance: "$6500.00",
    equity: "$7000.00",
    marginLevel: "25%",
    groupName: "Platinum",
    totalPnl: "$900.00",
  },
  {
    userId: "105",
    customerName: "Edward Carter",
    accountId: "AC10567",
    fund: "$4000.00",
    balance: "$2500.00",
    equity: "$3000.00",
    marginLevel: "10%",
    groupName: "Standard",
    totalPnl: "$300.00",
  },
];

const OrdersTable = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({
    mamshare: "",
    followershare: "",
  });

  const handleEditClick = (followerData) => {
    setEditData({
      mamshare: followerData.mamshare,
      followershare: followerData.followershare,
    });
    setEditId(followerData.accountId); // Use uid to identify which row to edit
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

  const handleButtonClick = (userId) => {
    setSelectedItem((prevSelected) =>
      prevSelected === userId ? null : userId
    );
  };

  const parseCurrency = (value) =>
    parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0;

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download as CSV
  const downloadCSV = () => {
    const csvRows = [
      [
        "User ID",
        "Customer Name",
        "Account ID",
        "Fund",
        "Balance",
        "Equity",
        "Margin Level",
        "Group Name",
        "Total PNL",
      ],
      ...orders.map((order) => [
        order.userId,
        order.customerName,
        order.accountId,
        order.fund,
        order.balance,
        order.equity,
        order.marginLevel,
        order.groupName,
        order.totalPnl,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "orders.csv");
  };

  // Download as Excel
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

  // Download as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Report", 14, 10);
    doc.autoTable({
      head: [
        [
          "User ID",
          "Customer Name",
          "Account ID",
          "Fund",
          "Balance",
          "Equity",
          "Margin Level",
          "Group Name",
          "Total PNL",
        ],
      ],
      body: orders.map((order) => [
        order.userId,
        order.customerName,
        order.accountId,
        order.fund,
        order.balance,
        order.equity,
        order.marginLevel,
        order.groupName,
        order.totalPnl,
      ]),
    });
    doc.save("orders.pdf");
  };

  return (
    <div className="space-y-4">
      {/* Search Section */}
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

      {/* Orders Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Account ID</th>
              <th className="px-4 py-2 border">Fund</th>
              <th className="px-4 py-2 border">Balance</th>
              <th className="px-4 py-2 border">Equity</th>
              <th className="px-4 py-2 border">Margin Level</th>
              <th className="px-4 py-2 border">Group Name</th>
              <th className="px-4 py-2 border">Total PNL</th>
              <th className="px-6 py-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <React.Fragment key={order.userId}>
                <tr
                  className={`text-sm ${index % 2 === 0 ? "bg-[#E6F3F7]" : ""}`}
                >
                  <td className="px-4 py-2 border">{order.userId}</td>
                  <td className="px-4 py-2 border">{order.customerName}</td>
                  <td className="px-4 py-2 border">{order.accountId}</td>
                  <td className="px-4 py-2 border">
                    ${parseCurrency(order.fund).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    ${parseCurrency(order.balance).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    ${parseCurrency(order.equity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">{order.marginLevel}</td>
                  <td className="px-4 py-2 border">{order.groupName}</td>
                  <td className="px-4 py-2 border">
                    ${parseCurrency(order.totalPnl).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className={`${
                        selectedItem === order.userId
                          ? "bg-red-500"
                          : "bg-[#2D1B69]"
                      } hover:bg-[#3D2B79] text-white px-4 py-1 rounded`}
                      onClick={() => handleButtonClick(order.userId)}
                    >
                      {selectedItem === order.userId ? "Close" : "Show Orders"}
                    </button>
                  </td>
                </tr>
                {selectedItem === order.userId && (
                  <tr>
                    <td colSpan="10" className="px-4 py-2 border">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-left">
                          <thead>
                            <tr className="bg-gray-200 text-sm font-semibold text-gray-700">
                              <th className="px-4 py-2 border">
                                Follower Name
                              </th>
                              <th className="px-4 py-2 border">Account ID</th>
                              <th className="px-4 py-2 border">MAM Share</th>
                              <th className="px-4 py-2 border">
                                Follower Share
                              </th>
                              <th className="px-4 py-2 border">Date</th>
                              <th className="px-4 py-2 border">Edit Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {followerData[order.userId]?.map(
                              (follower, index) => (
                                <tr
                                  key={index}
                                  className={`text-sm ${
                                    index % 2 === 0 ? "bg-gray-100" : ""
                                  }`}
                                >
                                  <td className="px-4 py-2 border">
                                    {follower.followername}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {follower.accountId}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {follower.mamshare}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {follower.followershare}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {follower.date}
                                  </td>

                                  <td className="px-4 py-2 border text-center">
                                    <button
                                      onClick={() => handleEditClick(follower)}
                                    >
                                      <Edit className="cursor-pointer" />
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
                  Mam Share:
                </label>
                <input
                  type="number"
                  name="lot"
                  value={editData.mamshare}
                  onChange={handleEditChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-600">
                  Followers Share:
                </label>
                <input
                  type="number"
                  name="Followers Share"
                  value={editData.followershare}
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
      {/* Download Buttons */}
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

export default OrdersTable;
