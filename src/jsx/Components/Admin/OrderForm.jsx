import React from "react";
import { useState } from "react";

const OrderForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderType, setOrderType] = useState(""); // "Buy" or "Sell"
  const [editData, setEditData] = useState({
    lot: "",
    sl: "",
    target: "",
    avg: "",
    bs: "",
    brokerage: "",
    pnl: "",
    trigger: "",
    time: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderClick = (type) => {
    setOrderType(type);
    setEditData((prev) => ({ ...prev, bs: type })); // Prefill Buy/Sell field
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the order data (e.g., send to API)
    console.log("Order submitted:", editData);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-sm"
          onClick={() => handleOrderClick("Buy")}
        >
          Buy Order
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-sm"
          onClick={() => handleOrderClick("Sell")}
        >
          Sell Order
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-2 gap-5 animate-fade-in">
            <span
              className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </span>

            <h2 className="col-span-2 text-center text-lg font-bold text-gray-800 mb-5">
              {orderType} Order
            </h2>

            {/* Form Fields */}
            <form
              onSubmit={handleSubmit}
              className="col-span-2 grid grid-cols-2 gap-5"
            >
              {/* All form fields here */}
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

              <button
                type="submit"
                className="col-span-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
