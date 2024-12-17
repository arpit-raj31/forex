import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import "jspdf-autotable";
import { FaPenToSquare } from "react-icons/fa6";

const UserDocumnets = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeRow, setActiveRow] = useState(null);

    const userData = [
        { sNo: 1, acId: 10010, username: "Rohan", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 05:23:49", bank: "-", other: "-" },
        { sNo: 2, acId: 10011, username: "Priya", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 06:00:22", bank: "-", other: "-" },
        { sNo: 3, acId: 10012, username: "Amit", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 06:15:11", bank: "-", other: "-" },
        { sNo: 4, acId: 10013, username: "Sara", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 06:45:34", bank: "-", other: "-" },
        { sNo: 5, acId: 10014, username: "Raj", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 07:05:47", bank: "-", other: "-" },
        { sNo: 6, acId: 10015, username: "Simran", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 07:20:55", bank: "-", other: "-" },
        { sNo: 7, acId: 10016, username: "Rahul", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 07:35:22", bank: "-", other: "-" },
        { sNo: 8, acId: 10017, username: "Neha", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 07:50:33", bank: "-", other: "-" },
        { sNo: 9, acId: 10018, username: "Vikram", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 08:10:11", bank: "-", other: "-" },
        { sNo: 10, acId: 10019, username: "Sonia", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 08:25:45", bank: "-", other: "-" },
        { sNo: 11, acId: 10020, username: "Kunal", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 08:35:59", bank: "-", other: "-" },
        { sNo: 12, acId: 10021, username: "Anjali", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 08:45:18", bank: "-", other: "-" },
        { sNo: 13, acId: 10022, username: "Manish", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 08:55:42", bank: "-", other: "-" },
        { sNo: 14, acId: 10023, username: "Nisha", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 09:10:03", bank: "-", other: "-" },
        { sNo: 15, acId: 10024, username: "Karthik", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 09:20:25", bank: "-", other: "-" },
        { sNo: 16, acId: 10025, username: "Meera", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 09:30:47", bank: "-", other: "-" },
        { sNo: 17, acId: 10026, username: "Vikas", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 09:45:11", bank: "-", other: "-" },
        { sNo: 18, acId: 10027, username: "Riya", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 09:55:33", bank: "-", other: "-" },
        { sNo: 19, acId: 10028, username: "Arjun", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 10:05:22", bank: "-", other: "-" },
        { sNo: 20, acId: 10029, username: "Divya", addressf: "-", addressb: "-", nationalidf: "-", nationalidb: "-", datetime: "2024-10-15 10:15:44", bank: "-", other: "-" }
    ];

    const filteredUsers = userData.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.acId.toString().includes(searchTerm)
    );

    const handleAddDocumentsClick = (rowId) => {
        setActiveRow(activeRow === rowId ? null : rowId);
    };

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-bold">User Data</h1>

            <div className="flex gap-4 py-4">
                <input
                    type="text"
                    placeholder="Search by Username or Account ID"
                    className="max-w-sm p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="outline-none p-2 border rounded flex items-center">
                    <SearchIcon className="size-4" />
                    <span className="sr-only">Search</span>
                </button>
            </div>

            <div className="rounded-md border overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
                            {["S.No", "Account ID", "Username", "Date & Time", "Address Front", "Address Back", "National ID Front", "National ID Back", "Bank", "Other", "Actions"].map((header) => (
                                <th key={header} className="px-4 py-2 border">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <>
                                <tr key={index} className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="px-4 py-2 border">{user.sNo}</td>
                                    <td className="px-4 py-2 border">{user.acId}</td>
                                    <td className="px-4 py-2 border">{user.username}</td>
                                    <td className="px-4 py-2 border">{user.datetime}</td>
                                    <td className="px-4 py-2 border">{user.addressf}</td>
                                    <td className="px-4 py-2 border">{user.addressb}</td>
                                    <td className="px-4 py-2 border">{user.nationalidf}</td>
                                    <td className="px-4 py-2 border">{user.nationalidb}</td>
                                    <td className="px-4 py-2 border">{user.bank}</td>
                                    <td className="px-4 py-2 border">{user.other}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            className="text-blue-500 hover:underline flex items-center"
                                            onClick={() => handleAddDocumentsClick(user.sNo)}
                                        >
                                            <FaPenToSquare className="mr-1" /> Add Documents
                                        </button>
                                    </td>
                                </tr>
                                {activeRow === user.sNo && (
                                    <tr className="bg-gray-100">
                                        <td colSpan={5} className="px-4 py-4 border">
                                            <div className="p-4 bg-white shadow rounded">
                                                <h3 className="text-lg font-semibold mb-4">Add Documents for {user.username}</h3>
                                                <form>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium mb-2">Document Type:</label>
                                                        <select className="w-full px-3 py-2 border rounded">
                                                            <option>--Select Document Type--</option>
                                                            <option value="address-proof">Address Proof</option>
                                                            <option value="national-id">National ID</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium mb-2">Upload Document:</label>
                                                        <input type="file" className="w-full px-3 py-2 border rounded" />
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                                            onClick={() => setActiveRow(null)}
                                                        >
                                                            Close
                                                        </button>
                                                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDocumnets;
