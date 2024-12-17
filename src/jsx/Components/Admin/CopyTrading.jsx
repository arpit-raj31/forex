import React, { useState } from "react";

const CopyTrading = () => {
  const [exchange, setExchange] = useState("");
  const [transaction, setTransaction] = useState("");
  const [product, setProduct] = useState("");

  const cryptoOptions = [
    { value: "btc", label: "Bitcoin (BTC)" },
    { value: "eth", label: "Ethereum (ETH)" },
    { value: "xrp", label: "Ripple (XRP)" },
    { value: "ltc", label: "Litecoin (LTC)" },
    { value: "bch", label: "Bitcoin Cash (BCH)" },
    { value: "ada", label: "Cardano (ADA)" },
    { value: "dot", label: "Polkadot (DOT)" },
    { value: "sol", label: "Solana (SOL)" },
    { value: "avax", label: "Avalanche (AVAX)" },
    { value: "doge", label: "Dogecoin (DOGE)" },
    { value: "shib", label: "Shiba Inu (SHIB)" },
    { value: "matic", label: "Polygon (MATIC)" },
    { value: "link", label: "Chainlink (LINK)" },
    { value: "usdt", label: "Tether (USDT)" },
    { value: "usdc", label: "USD Coin (USDC)" },
    { value: "busd", label: "Binance USD (BUSD)" },
    { value: "dai", label: "Dai (DAI)" },
  ];

  const forexOptions = [
    { value: "eurusd", label: "EUR/USD (Euro/US Dollar)" },
    { value: "gbpusd", label: "GBP/USD (British Pound/US Dollar)" },
    { value: "usdjpy", label: "USD/JPY (US Dollar/Japanese Yen)" },
    { value: "usdchf", label: "USD/CHF (US Dollar/Swiss Franc)" },
    { value: "audusd", label: "AUD/USD (Australian Dollar/US Dollar)" },
    { value: "nzdusd", label: "NZD/USD (New Zealand Dollar/US Dollar)" },
    { value: "usdcad", label: "USD/CAD (US Dollar/Canadian Dollar)" },
    { value: "eurgbp", label: "EUR/GBP (Euro/British Pound)" },
  ];

  const scriptOptions = exchange.includes("cryptocurrency")
    ? cryptoOptions
    : exchange.includes("forex")
    ? forexOptions
    : [];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Publish Your Own Strategies
      </h2>
      <form className="space-y-6">
        {/* Publisher Name */}
        <div>
          <label htmlFor="publisherName" className="block text-lg font-medium text-purple-700">
            Publisher Name
          </label>
          <input
            id="publisherName"
            placeholder="Enter publisher name"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
        </div>

        {/* Exchange */}
        <div>
          <label className="block text-lg font-medium text-purple-700">Exchange</label>
          <div className="flex space-x-4">
            {["Cryptocurrency:Instruments", "Forex:Instruments"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={type.toLowerCase()}
                  checked={exchange === type.toLowerCase()}
                  onChange={(e) => setExchange(e.target.value)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium text-purple-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Min Quantity"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
        </div>

        {/* Script Name */}
        <div>
          <label htmlFor="scriptName" className="block text-lg font-medium text-purple-700">
            Script Name
          </label>
          <select
            id="scriptName"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
          >
            <option value="">Choose one</option>
            {scriptOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction */}
        <div>
          <label className="block text-lg font-medium text-purple-700">Transaction</label>
          <div className="flex space-x-4">
            {["BUY", "SELL", "AUTO"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={type.toLowerCase()}
                  checked={transaction === type.toLowerCase()}
                  onChange={(e) => setTransaction(e.target.value)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <label className="block text-lg font-medium text-purple-700">Product</label>
          <div className="flex space-x-4">
            {["Intraday", "CarryForward(CNC)"].map((prod) => (
              <label key={prod} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={prod.toLowerCase()}
                  checked={product === prod.toLowerCase()}
                  onChange={(e) => setProduct(e.target.value)}
                />
                <span>{prod}</span>
              </label>
            ))}
          </div>
        </div>

        {/* More Details */}
        <div>
          <label className="block text-lg font-medium text-purple-700">More Details</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Creator Name"
              className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            <input
              type="number"
              placeholder="Min Capital"
              className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            <input
              placeholder="Draw Down"
              className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
        </div>

        {/* ROI */}
        <div>
          <label className="block text-lg font-medium text-purple-700">ROI</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Enter ROI"
              className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            <input
              type="number"
              placeholder="Enter Creator Charge"
              className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            <input
              placeholder="Bar Length"
              className="p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-purple-700">Description</label>
          <textarea
            placeholder="Describe the things..."
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-900 transition-all text-lg font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CopyTrading;
