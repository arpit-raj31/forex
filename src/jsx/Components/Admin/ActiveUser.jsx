import React, { useState } from "react";
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
  { sNo: 1, accNo: 1123, name: "Rajiv", token: "ref4etfve", balance: "14157" },
  { sNo: 2, accNo: 1124, name: "Anita", token: "gft8yth5e", balance: "25874" },
  { sNo: 3, accNo: 1125, name: "Vikram", token: "iop7fhg23", balance: "32156" },
  { sNo: 4, accNo: 1126, name: "Priya", token: "klm3gsdfe", balance: "8762" },
  { sNo: 5, accNo: 1127, name: "Nikhil", token: "wer4gbrt2", balance: "19438" },
  { sNo: 6, accNo: 1128, name: "Sunita", token: "psd9vfrtd", balance: "28517" },
  { sNo: 7, accNo: 1129, name: "Ajay", token: "lmk8nvfse", balance: "43792" },
  { sNo: 8, accNo: 1130, name: "Kiran", token: "prw3tgfde", balance: "11842" },
  { sNo: 9, accNo: 1131, name: "Rahul", token: "vbn3egdhj", balance: "15683" },
  { sNo: 10, accNo: 1132, name: "Rohit", token: "qwe6thgre", balance: "30928" },
  { sNo: 11, accNo: 1133, name: "Meera", token: "zxc7thfd3", balance: "45231" },
  {
    sNo: 12,
    accNo: 1134,
    name: "Suresh",
    token: "ijk4esdfr",
    balance: "16237",
  },
  { sNo: 13, accNo: 1135, name: "Neha", token: "asd9grth4", balance: "24952" },
  { sNo: 14, accNo: 1136, name: "Vivek", token: "tyu2fghrs", balance: "13547" },
  { sNo: 15, accNo: 1137, name: "Sneha", token: "gfh5jytge", balance: "48210" },
  {
    sNo: 16,
    accNo: 1138,
    name: "Deepak",
    token: "bvc7hgrtv",
    balance: "19243",
  },
  { sNo: 17, accNo: 1139, name: "Rita", token: "wer8uytre", balance: "34159" },
  { sNo: 18, accNo: 1140, name: "Amit", token: "edf6uyghv", balance: "22175" },
  { sNo: 19, accNo: 1141, name: "Pooja", token: "mnb5trghr", balance: "12659" },
  { sNo: 20, accNo: 1142, name: "Ravi", token: "uio3hfgt4", balance: "27385" },
];

const ActiveUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download as CSV
  const downloadCSV = () => {
    const csvRows = [
      ["S.No", "Account No", "Name", "Token", "Balance"],
      ...users.map((user) => [
        user.sNo,
        user.accNo,
        user.name,
        user.token,
        user.balance,
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
      head: [["S.No", "Account No", "Name", "Token", "Balance"]],
      body: users.map((user) => [
        user.sNo,
        user.accNo,
        user.name,
        user.token,
        user.balance,
      ]),
    });
    doc.save("users.pdf");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Active Users</h1>
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

      <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">S.No</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Account Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Token</th>
                  <th className="border border-gray-300 px-4 py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <React.Fragment key={user.sNo}>
                    <tr className="odd:bg-white even:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {user.sNo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.accNo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 flex items-center">
                        <span className="h-2.5 w-2.5 bg-green-500 rounded-full inline-block mr-2"></span>
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.token}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.balance}
                      </td>
                    </tr>
                  </React.Fragment>
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

export default ActiveUser;
