import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  File as FilePdf,
  Edit,
  Trash,
  Search as SearchIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import OrderForm from "./OrderForm";
import BuySellModal from "./BuySellModal";

const followerData = {
  101: [
    {
      sNo: 1,
      closeorder: <Trash />,
      uid: "U001",
      edit: <Edit />,
      time: "2024-10-25 15:28:37",
      symbol: "C:XAUUSD",
      lot: 10,
      bs: "Buy",
      sl: "0",
      target: "0",
      status: "Open",
      avg: "125.76",
      exit: "0",
      brokerage: "5",
      pnl: "0.00",
      copy: "x",
      sector: "metal",
      pair: "xxx",
      type: "market",
      trigger: "0",
      margin: "13.56",
      reason: "null",
      book: "b",
      swap: "0",
    },
    // Add more followers as needed
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
];

const Bbook = () => {
  const [buyOrder, setBuyOrder] = useState(false);
  const [sellOrder, setSellOrder] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editData, setEditData] = useState({
    lot: "",
    bs: "",
    sl: "",
    target: "",
    avg: "",
    brokerage: "",
    pnl: "",
    trigger: "",
    margin: "",
    time: "",
    swap: "",
  });

  const handleButtonClick = (userId) => {
    setSelectedItem((prevSelected) =>
      prevSelected === userId ? null : userId
    );
  };

  const handleDeleteClick = (userId) => {
    setDeleteId(userId);
    setShowConfirm(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle the modal visibility
  };

  const confirmDelete = () => {
    // Add your delete functionality here, e.g., call an API to delete the item
    console.log("Deleting item with ID:", deleteId);

    // Reset the states after deletion
    setDeleteId("");
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    // Reset the states if user cancels
    setDeleteId("");
    setShowConfirm(false);
  };

  const handleEditClick = (follower) => {
    setEditData({
      lot: follower.lot,
      bs: follower.bs,
      sl: follower.sl,
      target: follower.target,
      avg: follower.avg,
      brokerage: follower.brokerage,
      pnl: follower.pnl,
      trigger: follower.trigger,
      margin: follower.margin,
      time: follower.time,
      swap: follower.swap,
    });
    setEditId(follower.uid); // Use uid to identify which row to edit
  };

  const handleBuyClick = () => {
    setBuyOrder(true);
    setSellOrder(false); // Close Sell Order if open
  };

  const handleSellClick = () => {
    setSellOrder(true);
    setBuyOrder(false); // Close Buy Order if open
  };

  const closeForm = () => {
    setBuyOrder(false);
    setSellOrder(false);
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
      <h1 className="text-2xl font-bold">B Book</h1>
      <h5 className="space-y-2 mb-12">
        {/* Summary Section */}
        <span className="inline-block px-4 py-2 m-1 bg-blue-100 border border-blue-300 rounded-lg text-gray-800 font-semibold text-sm text-center">
          Total Used Margin: $29,965.85
        </span>
        <span className="inline-block px-4 py-2 m-1 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 font-semibold text-sm text-center">
          Total P/L: $658,787
        </span>
      </h5>

      <button
        onClick={toggleModal}
        className="bg-green-500 text-white px-4 py-2 rounded-sm"
      >
        Buy Order
      </button>

      <button
        onClick={toggleModal}
        className="bg-red-500 text-white px-4 py-2 rounded-sm ml-1"
      >
        Sell Order
      </button>
      {isModalOpen && <BuySellModal />}
      {/* <OrderForm/> */}

      <div className="flex gap-2">
        {/* Download Buttons */}
        <div className="flex gap-2 mr-[50rem]">
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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-4">
                  No data found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <React.Fragment key={order.userId}>
                  <tr
                    className={`text-sm ${
                      index % 2 === 0 ? "bg-[#E6F3F7]" : ""
                    }`}
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
                        {selectedItem === order.userId
                          ? "Close"
                          : "Show Orders"}
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
                                <th className="px-4 py-2 border">S.No</th>
                                <th className="px-4 py-2 border">
                                  Close order
                                </th>
                                <th className="px-4 py-2 border">UID</th>
                                <th className="px-4 py-2 border">Edit</th>
                                <th className="px-4 py-2 border">Time</th>
                                <th className="px-4 py-2 border">Symbol</th>
                                <th className="px-4 py-2 border">Lot</th>
                                <th className="px-4 py-2 border">Buy/Sell</th>
                                <th className="px-4 py-2 border">Stop Loss</th>
                                <th className="px-4 py-2 border">Target</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Avg Price</th>
                                <th className="px-4 py-2 border">Exit Price</th>
                                <th className="px-4 py-2 border">Brokerage</th>
                                <th className="px-4 py-2 border">PNL</th>
                                <th className="px-4 py-2 border">Copy</th>
                                <th className="px-4 py-2 border">Sector</th>
                                <th className="px-4 py-2 border">Pair</th>
                                <th className="px-4 py-2 border">Type</th>
                                <th className="px-4 py-2 border">Trigger</th>
                                <th className="px-4 py-2 border">Margin</th>
                                <th className="px-4 py-2 border">Reason</th>
                                <th className="px-4 py-2 border">Book</th>
                                <th className="px-4 py-2 border">Swap</th>
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
                                      {follower.sNo}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      <button
                                        onClick={() =>
                                          handleDeleteClick(order.userId)
                                        }
                                      >
                                        {follower.closeorder}
                                      </button>
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.uid}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      <button
                                        onClick={() =>
                                          handleEditClick(follower)
                                        }
                                      >
                                        {follower.edit}
                                      </button>
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.time}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.symbol}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.lot}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.bs}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.sl}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.target}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.status}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.avg}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.exit}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.brokerage}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.pnl}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.copy}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.sector}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.pair}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.type}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.trigger}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.margin}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.reason}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.book}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {follower.swap}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>

                          {showConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                              <div className="bg-white p-6 rounded-md text-center w-96">
                                <p className="mb-4">
                                  Are you sure you want to close this order?
                                </p>
                                <div className="flex justify-center gap-4">
                                  <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

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
                Lot:
              </label>
              <input
                type="number"
                name="lot"
                value={editData.lot}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Stop Loss:
              </label>
              <input
                type="number"
                name="sl"
                value={editData.sl}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Target:
              </label>
              <input
                type="number"
                name="target"
                value={editData.target}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Avg:
              </label>
              <input
                type="number"
                name="avg"
                value={editData.avg}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Buy/Sell:
              </label>
              <select
                name="bs"
                value={editData.bs}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Brokerage:
              </label>
              <input
                type="number"
                name="brokerage"
                value={editData.brokerage}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                PNL:
              </label>
              <input
                type="number"
                name="pnl"
                value={editData.pnl}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Trigger:
              </label>
              <input
                type="number"
                name="trigger"
                value={editData.trigger}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-semibold text-gray-600">
                Time:
              </label>
              <input
                type="datetime-local"
                name="time"
                value={editData.time}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-semibold text-gray-600">
                Total Swap:
              </label>
              <input
                type="number"
                name="swap"
                value={editData.swap}
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
  );
};

export default Bbook;
