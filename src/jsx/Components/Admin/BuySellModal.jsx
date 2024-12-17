import React, { useState } from "react";

const BuySellModal = () => {
  const [activeTab, setActiveTab] = useState("market");
  const [tradeType, setTradeType] = useState("buy");
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="w-full max-w-lg border border-gray-300 shadow-md rounded-lg">
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white rounded-t-lg">
            <h2 className="text-lg font-medium">Place Order</h2>
            <div className="flex items-center gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                BUY
              </button>
              <button
                onClick={handleCloseModal} // Close modal on click
                className="h-8 w-8 p-0 flex items-center justify-center bg-transparent text-white hover:bg-blue-700 rounded"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-4 p-4">
            {/* Select User */}
            <div>
              <select className="w-full border border-gray-300 rounded p-2">
                <option value="" disabled selected>
                  Please select user
                </option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
              </select>
            </div>

            {/* Select Symbols */}
            <div>
              <select className="w-full border border-gray-300 rounded p-2">
                <option value="" disabled selected>
                  Please select symbols
                </option>
                <option value="btc">BTC/USD</option>
                <option value="eth">ETH/USD</option>
              </select>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2">
              <button
                className={`flex-1 p-2 text-center rounded ${
                  activeTab === "market"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("market")}
              >
                Market
              </button>
              <button
                className={`flex-1 p-2 text-center rounded ${
                  activeTab === "limit"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("limit")}
              >
                Limit
              </button>
              <button
                className={`flex-1 p-2 text-center rounded ${
                  activeTab === "stop"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("stop")}
              >
                Stop HFT
              </button>
            </div>

            {/* Content Based on Active Tab */}
            <div className="space-y-4">
              {activeTab === "market" && (
                <>
                  <div>
                    <label className="text-sm text-gray-600">Lot size</label>
                    <input
                      type="number"
                      placeholder="Lot size"
                      className="w-full mt-1 border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Stop Loss</label>
                      <input
                        type="number"
                        placeholder="Optional SL"
                        className="w-full mt-1 border border-gray-300 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Target</label>
                      <input
                        type="number"
                        placeholder="Optional Target"
                        className="w-full mt-1 border border-gray-300 rounded p-2"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Buy now at market price.
                  </p>
                </>
              )}

              {activeTab === "limit" && (
                <>
                  <div>
                    <label className="text-sm text-gray-600">Lot Size</label>
                    <input
                      type="number"
                      placeholder="Lot Size"
                      className="w-full mt-1 border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Trigger</label>
                    <input
                      type="number"
                      placeholder="Trigger Price"
                      className="w-full mt-1 border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Stop Loss</label>
                      <input
                        type="number"
                        placeholder="Optional SL"
                        className="w-full mt-1 border border-gray-300 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Target</label>
                      <input
                        type="number"
                        placeholder="Optional Target"
                        className="w-full mt-1 border border-gray-300 rounded p-2"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Buy When Price reaches your Trigger price.
                  </p>
                </>
              )}

              {activeTab === "stop" && (
                <>
                  {/* Your Stop Tab content */}
                  <p>Stop Tab Content Here</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t bg-gray-50 p-4 rounded-b-lg">
            <p className="text-sm text-blue-600">Margin Required : $0</p>
            <button
              className={`px-4 py-2 text-white rounded ${
                activeTab === "stop" && tradeType === "sell"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {activeTab === "stop"
                ? tradeType === "sell"
                  ? "SELL"
                  : tradeType === "both"
                  ? "BUY/SELL"
                  : "BUY"
                : "BUY"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuySellModal;
