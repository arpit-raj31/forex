import React, { useState } from "react";

const TransactionHistory = () => {
    const [filter, setFilter] = useState({
        timePeriod: "Last 3 months",
        transactionType: "All transaction types",
        status: "All statuses",
        account: "All accounts",
    });

    const transactions = [
        {
            date: "November 2024",
            data: [
                {
                    type: "Withdrawal",
                    time: "01 Nov, 20:18",
                    invoiceId: "1287353821",
                    source: "185180213",
                    destination: "Online Bank",
                    status: "Rejected",
                    amount: "-15.00 USD",
                },
            ],
        },
        {
            date: "October 2024",
            data: [
                {
                    type: "Deposit",
                    time: "06 Oct, 21:31",
                    invoiceId: "38222180356",
                    source: "BinancePay",
                    destination: "185180213",
                    status: "Done",
                    amount: "+10.00 USD",
                },
                {
                    type: "Withdrawal",
                    time: "06 Oct, 19:38",
                    invoiceId: "1287352482",
                    source: "185180213",
                    destination: "BinancePay",
                    status: "Rejected",
                    amount: "-2.00 USD",
                },
            ],
        },
        {
            date: "September 2024",
            data: [],
        },
    ];

    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    return (
        <div className="p-6">
            {/* Filters Section */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <select
                    className="border p-2 rounded"
                    value={filter.timePeriod}
                    onChange={(e) => handleFilterChange("timePeriod", e.target.value)}
                >
                    <option value="Last 3 months">Last 3 months</option>
                    <option value="Last 6 months">Last 6 months</option>
                    <option value="Last year">Last year</option>
                    <option value="All time">All time</option>
                </select>

                <select
                    className="border p-2 rounded"
                    value={filter.transactionType}
                    onChange={(e) =>
                        handleFilterChange("transactionType", e.target.value)
                    }
                >
                    <option value="All transaction types">All transaction types</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdrawal">Withdrawal</option>
                </select>

                <select
                    className="border p-2 rounded"
                    value={filter.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                    <option value="All statuses">All statuses</option>
                    <option value="Done">Done</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <select
                    className="border p-2 rounded"
                    value={filter.account}
                    onChange={(e) => handleFilterChange("account", e.target.value)}
                >
                    <option value="All accounts">All accounts</option>
                    <option value="Account 1">Account 1</option>
                    <option value="Account 2">Account 2</option>
                </select>

                <button className="ml-auto p-2 bg-blue-500 text-white rounded">
                    Get support
                </button>
            </div>

            {/* Transactions Section */}
            <div className="space-y-6">
                {transactions.map((section, idx) => (
                    <div key={idx}>
                        <h2 className="text-lg font-semibold mb-4">{section.date}</h2>
                        {section.data.length > 0 ? (
                            section.data.map((txn, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 border rounded mb-2"
                                >
                                    <div>
                                        <p className="font-semibold">{txn.type}</p>
                                        <p className="text-sm text-gray-500">{txn.time}</p>
                                        <p className="text-sm text-gray-500">
                                            Invoice ID: {txn.invoiceId}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm">{txn.source}</p>
                                        <p>→</p>
                                        <p className="text-sm">{txn.destination}</p>
                                    </div>
                                    <div>
                                        <span
                                            className={`text-sm font-semibold p-1 px-2 rounded ${
                                                txn.status === "Done"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {txn.status}
                                        </span>
                                    </div>
                                    <div
                                        className={`font-bold ${
                                            txn.amount.startsWith("+")
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {txn.amount}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No transactions found.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;
