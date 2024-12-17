import React, { useState } from "react";
import { FileText, FileSpreadsheet, File as FilePdf, Edit, Search as SearchIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const followerData = {
    101: [
        {
            sNo: 1,
            uid: 'F12345',
            time: '2024-10-25',
            symbol: 'AAPL',
            lot: 10,
            bs: 'Buy',
            sl: '100.00',
            target: '110.00',
            status: 'Open',
            avg: '105.00',
            exit: '0.00',
            brokerage: '5.00',
            pnl: '50.00',
            copy: 'No',
            sector: 'Technology',
            pair: 'AAPL/USD',
            type: 'Equity',
            trigger: 'Manual',
            margin: '10%',
            reason: 'Earnings',
        },
        // Add more followers as needed
    ],
};

const orders = [
    { userId: "101", customerName: "Alice Smith", accountId: "AC10123", fund: "$7500.00", balance: "$5000.00", equity: "$6000.00", marginLevel: "20%", groupName: "Gold", totalPnl: "$800.00" },
    { userId: "102", customerName: "Bob Johnson", accountId: "AC10234", fund: "$6200.00", balance: "$4000.00", equity: "$4500.00", marginLevel: "18%", groupName: "Silver", totalPnl: "$650.00" },
    { userId: "103", customerName: "Charlie Brown", accountId: "AC10345", fund: "$5400.00", balance: "$3600.00", equity: "$4100.00", marginLevel: "22%", groupName: "Bronze", totalPnl: "$550.00" },
    { userId: "104", customerName: "Diana Prince", accountId: "AC10456", fund: "$8200.00", balance: "$6500.00", equity: "$7000.00", marginLevel: "25%", groupName: "Platinum", totalPnl: "$900.00" },
    { userId: "105", customerName: "Edward Carter", accountId: "AC10567", fund: "$4000.00", balance: "$2500.00", equity: "$3000.00", marginLevel: "10%", groupName: "Standard", totalPnl: "$300.00" },
];

const ABook = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleButtonClick = (userId) => {
        setSelectedItem((prevSelected) => (prevSelected === userId ? null : userId));
    };

    const parseCurrency = (value) => parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0;

    const filteredOrders = orders.filter((order) =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Download as CSV
    const downloadCSV = () => {
        const csvRows = [
            ["User ID", "Customer Name", "Account ID", "Fund", "Balance", "Equity", "Margin Level", "Group Name", "Total PNL"],
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
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "orders.xlsx");
    };

    // Download as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Orders Report", 14, 10);
        doc.autoTable({
            head: [
                ["User ID", "Customer Name", "Account ID", "Fund", "Balance", "Equity", "Margin Level", "Group Name", "Total PNL"],
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

            <h1 className="text-2xl font-bold">A Book</h1>
            <h5 className="space-y-2 mb-12">
                {/* Summary Section */}
                <span className="inline-block px-4 py-2 m-1 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 font-semibold text-sm text-center">
                    Total Average Balance: $313,592.50
                </span>
                <span className="inline-block px-4 py-2 m-1 bg-blue-100 border border-blue-300 rounded-lg text-gray-800 font-semibold text-sm text-center">
                    Total Used Margin: $29,965.85
                </span>
                <span className="inline-block px-4 py-2 m-1 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 font-semibold text-sm text-center">
                    Total Free Margin: $283,626.65
                </span>
                <span className="inline-block px-4 py-2 m-1 bg-blue-100 border border-blue-300 rounded-lg text-gray-800 font-semibold text-sm text-center">
                    Margin Level: 1046.50%
                </span>
                <span className="inline-block px-4 py-2 m-1 bg-blue-50 border border-blue-200 rounded-lg text-gray-800 font-semibold text-sm text-center">
                    Total P/L: $658,787
                </span>
            </h5>


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
                        {filteredOrders.map((order, index) => (
                            <React.Fragment key={order.userId}>
                                <tr className={`text-sm ${index % 2 === 0 ? "bg-[#E6F3F7]" : ""}`}>
                                    <td className="px-4 py-2 border">{order.userId}</td>
                                    <td className="px-4 py-2 border">{order.customerName}</td>
                                    <td className="px-4 py-2 border">{order.accountId}</td>
                                    <td className="px-4 py-2 border">${parseCurrency(order.fund).toFixed(2)}</td>
                                    <td className="px-4 py-2 border">${parseCurrency(order.balance).toFixed(2)}</td>
                                    <td className="px-4 py-2 border">${parseCurrency(order.equity).toFixed(2)}</td>
                                    <td className="px-4 py-2 border">{order.marginLevel}</td>
                                    <td className="px-4 py-2 border">{order.groupName}</td>
                                    <td className="px-4 py-2 border">${parseCurrency(order.totalPnl).toFixed(2)}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            className={`${selectedItem === order.userId
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
                                                            <th className="px-4 py-2 border">Follower Name</th>
                                                            <th className="px-4 py-2 border">Account ID</th>
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {followerData[order.userId]?.map((follower, index) => (
                                                            <tr
                                                                key={index}
                                                                className={`text-sm ${index % 2 === 0 ? "bg-gray-100" : ""
                                                                    }`}
                                                            >
                                                                <td className="px-4 py-2 border">{follower.sNo}</td>
                                                                <td className="px-4 py-2 border">{follower.uid}</td>
                                                                <td className="px-4 py-2 border">{follower.time}</td>
                                                                <td className="px-4 py-2 border">{follower.symbol}</td>
                                                                <td className="px-4 py-2 border">{follower.lot}</td>
                                                                <td className="px-4 py-2 border">{follower.bs}</td>
                                                                <td className="px-4 py-2 border">{follower.sl}</td>
                                                                <td className="px-4 py-2 border">{follower.target}</td>
                                                                <td className="px-4 py-2 border">{follower.status}</td>
                                                                <td className="px-4 py-2 border">{follower.avg}</td>
                                                                <td className="px-4 py-2 border">{follower.exit}</td>
                                                                <td className="px-4 py-2 border">{follower.brokerage}</td>
                                                                <td className="px-4 py-2 border">{follower.pnl}</td>
                                                                <td className="px-4 py-2 border">{follower.copy}</td>
                                                                <td className="px-4 py-2 border">{follower.sector}</td>
                                                                <td className="px-4 py-2 border">{follower.pair}</td>
                                                                <td className="px-4 py-2 border">{follower.type}</td>
                                                                <td className="px-4 py-2 border">{follower.trigger}</td>
                                                                <td className="px-4 py-2 border">{follower.margin}</td>
                                                                <td className="px-4 py-2 border">{follower.reason}</td>
                                                            </tr>
                                                        ))}
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
            </div>

        </div>
    );
};

export default ABook;
