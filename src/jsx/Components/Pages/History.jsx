import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const OrdersTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("Order History");
    const [dateFilter, setDateFilter] = useState("All"); // State for date filter

    // Dummy data for Orders
    const orders = [
        { symbol: "AAPL", type: "Buy", openingTimeUTC: "2024-11-29T10:00:00Z", closingTimeUTC: "2024-11-30T15:00:00Z", lots: 10, openingPrice: 145.5, closingPrice: 150.3, profitUSD: 48.0 },
        { symbol: "MSFT", type: "Sell", openingTimeUTC: "2024-06-15T09:30:00Z", closingTimeUTC: "2024-06-16T12:00:00Z", lots: 5, openingPrice: 310.0, closingPrice: 305.0, profitUSD: -25.0 },
    ];

    const history = [
        { symbol: "TSLA", type: "Buy", openingTimeUTC: "2024-12-01T10:00:00Z", closingTimeUTC: "2024-12-02T15:00:00Z", lots: 8, openingPrice: 245.5, closingPrice: 250.3, profitUSD: 40.0 },
        { symbol: "GOOG", type: "Sell", openingTimeUTC: "2024-05-10T09:30:00Z", closingTimeUTC: "2024-05-11T12:00:00Z", lots: 3, openingPrice: 1220.0, closingPrice: 1215.0, profitUSD: -15.0 },
    ];

    // Helper function to filter by date
    const filterByDate = (data) => {
        if (dateFilter === "All") return data;
        const now = new Date();
        let filterDate;

        switch (dateFilter) {
            case "Last Week":
                filterDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case "30 Days":
                filterDate = new Date(now.setDate(now.getDate() - 30));
                break;
            case "Six Months":
                filterDate = new Date(now.setMonth(now.getMonth() - 6));
                break;
            case "1 Year":
                filterDate = new Date(now.setFullYear(now.getFullYear() - 1));
                break;
            default:
                return data;
        }

        return data.filter((entry) => new Date(entry.openingTimeUTC) >= filterDate);
    };

    // Dynamic filtering logic
    const filteredData = filterByDate(
        activeTab === "Order History" ? orders : history
    ).filter((entry) =>
        Object.values(entry).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Tab content switcher
    const renderContent = () => (
        <div className="rounded-md border overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
                <thead>
                    <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
                        <th className="px-4 py-2 border">Symbol</th>
                        <th className="px-4 py-2 border">Type</th>
                        <th className="px-4 py-2 border">Opening Time UTC</th>
                        <th className="px-4 py-2 border">Closing Time UTC</th>
                        <th className="px-4 py-2 border">Lots</th>
                        <th className="px-4 py-2 border">Opening Price</th>
                        <th className="px-4 py-2 border">Closing Price</th>
                        <th className="px-4 py-2 border">Profit (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((entry, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="px-4 py-2 border">{entry.symbol}</td>
                            <td className="px-4 py-2 border">{entry.type}</td>
                            <td className="px-4 py-2 border">{entry.openingTimeUTC}</td>
                            <td className="px-4 py-2 border">{entry.closingTimeUTC}</td>
                            <td className="px-4 py-2 border">{entry.lots}</td>
                            <td className="px-4 py-2 border">{entry.openingPrice}</td>
                            <td className="px-4 py-2 border">{entry.closingPrice}</td>
                            <td className="px-4 py-2 border">{entry.profitUSD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="space-y-4 mt-12">
            {/* Search and Filter */}
            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}`}
                        className="p-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="p-2 border rounded ml-2">
                        <SearchIcon size={18} />
                    </button>
                </div>
                <select
                    className="p-2 border rounded"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Last Week">Last Week</option>
                    <option value="30 Days">30 Days</option>
                    <option value="Six Months">Six Months</option>
                    <option value="1 Year">1 Year</option>
                </select>
                <div className="flex gap-2">
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "Order History" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab("Order History")}
                    >
                        Order History
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeTab === "Open History" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab("Open History")}
                    >
                        Open History
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {renderContent()}
        </div>
    );
};

export default OrdersTable;
