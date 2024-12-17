import React, { useState } from "react";
import { FileText, FileSpreadsheet, Search as SearchIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import "jspdf-autotable";
import DeleteButtonModal from "./DeleteButtonModal";

const initialOrders = [
  { sNo: 1, name: "Bank Transfer - Account Number: 123456789", flag: "enable" },
  { sNo: 2, name: "IFSC Code: ABCD0123456", flag: "disable" },
  { sNo: 3, name: "Bank Transfer - Account Number: 987654321", flag: "enable" },
  { sNo: 4, name: "IFSC Code: XYZD9876543", flag: "disable" },
  { sNo: 5, name: "Bank Transfer - Account Number: 555555555", flag: "enable" },
  { sNo: 6, name: "Bank Transfer - IFSC Code: PQRS5432109", flag: "enable" },
  { sNo: 7, name: "Bank Transfer - Account Number: 333333333", flag: "disable" },
  { sNo: 8, name: "Bank Transfer - IFSC Code: LMNO6543210", flag: "enable" },
  { sNo: 9, name: "Bank Transfer", flag: "enable" },
  { sNo: 10, name: "IFSC Code: UVWX1234567", flag: "disable" },
];

const WithdrawalList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [modalRowIndex, setModalRowIndex] = useState(null);

  const handleTypeChange = (index, newFlag) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, flag: newFlag } : order
    );
    setOrders(updatedOrders);
    console.log(`Flag for Order ${index + 1} changed to: ${newFlag}`);
  };

  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    setModalRowIndex(null);
  };

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Withdrawal List</h1>

      <div className="flex gap-4 py-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by Name or Account Details"
            className="p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 border rounded">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              {["S.No", "Name", "Flag", "Delete"].map((header) => (
                <th key={header} className="px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((data, index) => (
              <tr
                key={index}
                className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-4 py-2 border">{data.sNo}</td>
                <td className="px-4 py-2 border">{data.name}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={data.flag}
                    onChange={(e) => handleTypeChange(index, e.target.value)}
                    className="border rounded px-2 py-1 w-[80%]"
                  >
                    <option value="enable">enable</option>
                    <option value="disable">disable</option>
                  </select>
                </td>
                <td className="px-4 py-2 border text-center">
                  <Trash2
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
      </div>
    </div>
  );
};

export default WithdrawalList;
