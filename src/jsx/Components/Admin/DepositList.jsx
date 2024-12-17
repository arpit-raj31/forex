import React, { useState } from "react";
import {
    FileText,
    FileSpreadsheet,
    File as FilePdf,
    Search as SearchIcon,
    Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import DeleteButtonModal from "./DeleteButtonModal";
import { data } from "autoprefixer";

const DepositelList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [activeRow, setActiveRow] = useState(null);
    const [modalRowIndex, setModalRowIndex] = useState(null);

    const userData = [
        {
            sNo: 1,
            displytxt: "Bank Transfer",
            img: "", // Add image URL or keep empty
            himg: "", // Add header image URL or keep empty
            code: "ffesgdhgdtbcxbzdgserthfvgserg",
            flag: "enabled",
            minim: "$567",
            desclm: "Please only send USDT via the ERC20 Network.",
            edit: <FaPenToSquare />,
            delete: <RiDeleteBin6Fill />,
        },
        {
            sNo: 2,
            displytxt: "Credit Card",
            img: "", // Add an image URL
            himg: "", // Add a header image URL
            code: "cdehsd12rtygfgdsfg",
            flag: "disabled",
            minim: "$100",
            desclm: "Ensure the card is valid and has sufficient funds.",
            edit: <FaPenToSquare />,
            delete: <RiDeleteBin6Fill />,
        },
        {
            sNo: 3,
            displytxt: "PayPal",
            img: "", // Add an image URL
            himg: "", // Add a header image URL
            code: "pfghd56rtyhgfdsfg",
            flag: "enabled",
            minim: "$250",
            desclm: "Payments via PayPal are instant.",
            edit: <FaPenToSquare />,
            delete: <RiDeleteBin6Fill />,
        }


    ];



    const filteredData = userData.filter(
        (data) =>
            data.displytxt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const downloadCSV = () => {
        const csvRows = [
            [
                "S.No",
                "Display Text",
                "Image",
                "Header Image",
                "Code",
                "Flag",
                "Minimum",
                "Description",
                "Edit",
                "Delete",
            ],
            ...userData.map((data) => [
                data.sNo,
                data.displytxt,
                data.img || "",
                data.himg || "",
                data.code,
                data.flag,
                data.minim,
                data.desclm,
                "Edit",
                "Delete",
            ]),
        ];

        const csvContent = csvRows.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "userData.csv");
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((data) => ({
                "S.No": data.sNo,
                "Display Text": data.displytxt,
                Image: data.img,
                "Header Image": data.himg,
                Code: data.code,
                Flag: data.flag,
                Minimum: data.minim,
                Description: data.desclm,
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "UserData");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "userData.xlsx");
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("User Data", 14, 10);
        doc.autoTable({
            head: [
                ["S.No", "Display Text", "Code", "Flag", "Minimum", "Description"],
            ],
            body: userData.map((data) => [
                data.sNo,
                data.displytxt,
                data.code,
                data.flag,
                data.minim,
                data.desclm,
            ]),
        });
        doc.save("userData.pdf");
    };



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



    const handleEditClick = (rowId) => {
        setActiveRow(activeRow === rowId ? null : rowId);
    };



    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">DepositList</h1>

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
                                "Display Text",
                                "Image",
                                "Header Image",
                                "Code",
                                "Flag",
                                "Minimum",
                                "Description",
                                "Edit",
                                "Delete",
                            ].map((header) => (
                                <th key={header} className="px-4 py-2 border">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            <>
                                <tr
                                    key={index}
                                    className={`text-sm ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                                >
                                    <td className="px-4 py-2 border">{data.sNo}</td>
                                    <td className="px-4 py-2 border">{data.displytxt}</td>
                                    <td className="px-4 py-2 border">
                                        {data.img ? <img src={data.img} alt="" /> : "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {data.himg ? <img src={data.himg} alt="" /> : "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border">{data.code}</td>
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
                                    <td className="px-4 py-2 border">{data.minim}</td>
                                    <td className="px-4 py-2 border">{data.desclm}</td>
                                    <td className="px-4 py-2 border text-center" ><button
                                        className="text-blue-500 hover:underline flex items-center"
                                        onClick={() => handleEditClick(data.sNo)}
                                    >
                                        <FaPenToSquare className="mr-1" /> Edit
                                    </button></td>
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
                                {activeRow === data.sNo && (
                                    <tr className="bg-gray-100">
                                        <td colSpan={10} className="px-4 py-4 border">
                                            <div className="p-4 bg-white shadow rounded">
                                                <h3 className="text-lg font-semibold mb-4">Add Documents for {data.username}</h3>
                                                <form>
                                                   
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium mb-2">Image Upload:</label>
                                                        <input type="file" className="w-full px-3 py-2 border rounded" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium mb-2">Minimum:</label>
                                                        <input type="text" className="w-full px-3 py-2 border rounded" />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium mb-2">Description:</label>
                                                        <input type="text" className="w-full px-3 py-2 border rounded" />
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

export default DepositelList;
