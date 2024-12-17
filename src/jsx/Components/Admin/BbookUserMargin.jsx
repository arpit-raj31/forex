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

const BbookUserMargin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const userData = [
        {
            userId: "124",
            customerName: "Jane Smith",
            accountId: "AC12346",
            fund: 10000,
            balance: 7000,
            equity: 8000,
            marginLevel: "10%",
            groupName: "Standard",
            totalPNL: 1000,
        },
        {
            userId: "125",
            customerName: "Rolex",
            accountId: "AC12346",
            fund: 10000,
            balance: 7000,
            equity: 8000,
            marginLevel: "10%",
            groupName: "Standard",
            totalPNL: 1000,
        },
        {
            userId: "126",
            customerName: "Titan",
            accountId: "AC12346",
            fund: 10000,
            balance: 7000,
            equity: 8000,
            marginLevel: "10%",
            groupName: "Standard",
            totalPNL: 1000,
        },
    ];

    const filteredUsers = userData.filter(
        (user) =>
            user.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.accountId.toString().includes(searchTerm)
    );

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
            ...userData.map((user) => [
                user.userId,
                user.customerName,
                user.accountId,
                user.fund,
                user.balance,
                user.equity,
                user.marginLevel,
                user.groupName,
                user.totalPNL,
            ]),
        ];

        const csvContent = csvRows.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "userData.csv");
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(userData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "userData.xlsx");
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("User Data", 14, 10);
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
            body: userData.map((user) => [
                user.userId,
                user.customerName,
                user.accountId,
                user.fund,
                user.balance,
                user.equity,
                user.marginLevel,
                user.groupName,
                user.totalPNL,
            ]),
        });
        doc.save("userData.pdf");
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">BBookUserMargin</h1>



            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by Customer Name or Account ID"
                    className="max-w-sm p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="outline-none p-2 border rounded flex items-center">
                    <SearchIcon className="size-4" />
                    <span className="sr-only">Search</span>
                </button>
            </div>


            <div className="text-gray-900 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-center">
                        <h2 className="text-sm text-gray-400">Total Used Margin</h2>
                        <p className="text-lg font-bold">$28,460.34</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-sm text-gray-400">Total P/L</h2>
                        <p className="text-lg font-bold text-green-500">$78,701.45</p>
                    </div>
                </div>
            </div>



            <div className="rounded-md border overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
                            {[
                                "User ID",
                                "Customer Name",
                                "Account ID",
                                "Fund",
                                "Balance",
                                "Equity",
                                "Margin Level",
                                "Group Name",
                                "Total PNL",
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
                                <td className="px-4 py-2 border">{user.userId}</td>
                                <td className="px-4 py-2 border">{user.customerName}</td>
                                <td className="px-4 py-2 border">{user.accountId}</td>
                                <td className="px-4 py-2 border">{user.fund}</td>
                                <td className="px-4 py-2 border">{user.balance}</td>
                                <td className="px-4 py-2 border">{user.equity}</td>
                                <td className="px-4 py-2 border">{user.marginLevel}</td>
                                <td className="px-4 py-2 border">{user.groupName}</td>
                                <td className="px-4 py-2 border">{user.totalPNL}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-2 mb-4">
                <button className="border rounded gap-2 px-4 py-2 flex items-center" onClick={downloadCSV}>
                    <FileText className="size-4" />
                    Download CSV
                </button>
                <button className="border rounded gap-2 px-4 py-2 flex items-center" onClick={downloadExcel}>
                    <FileSpreadsheet className="size-4" />
                    Download Excel
                </button>
                <button className="border rounded gap-2 px-4 py-2 flex items-center" onClick={downloadPDF}>
                    <FilePdf className="size-4" />
                    Download PDF
                </button>
            </div>
        </div>
    );
};


export default BbookUserMargin;