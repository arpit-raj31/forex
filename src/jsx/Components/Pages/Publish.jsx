import React, { useState } from "react";

export function Publish() {
  const [exchange, setExchange] = useState("");
  const [transaction, setTransaction] = useState("");
  const [product, setProduct] = useState("");
  const [publish, setPublish] = useState("");

  const cardStyle = {
    width: "100%",
    maxWidth: "40rem",
    margin: "2rem auto",
    backgroundColor: "#ffffff",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: "scale(1.02)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#362465",
    marginBottom: "1.5rem",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "0.5rem",
    display: "block",
    color: "#362465",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #9466FF",
    borderRadius: "0.5rem",
    transition: "border-color 0.3s ease",
    fontSize: "1rem",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#362465",
    outline: "none",
    boxShadow: "0 0 5px rgba(148, 102, 255, 0.5)",
  };

  const radioGroupStyle = {
    display: "flex",
    gap: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#9466FF",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "100%",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#362465",
  };

  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
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
    <div
      style={isCardHovered ? cardHoverStyle : cardStyle}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <h2 style={titleStyle}>Publish Your Own Strategies</h2>
      <form style={formStyle}>
        <div>
          <label htmlFor="publisherName" style={labelStyle}>
            Publisher Name
          </label>
          <input
            id="publisherName"
            placeholder="Enter publisher name"
            style={isInputFocused ? inputFocusStyle : inputStyle}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>

        {/* Exchange */}
        <div>
          <label style={labelStyle}>Exchange</label>
          <div style={radioGroupStyle}>
            {["Cryptocurrency:Instruments", "Forex:Instruments"].map((type) => (
              <label key={type} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  value={type.toLowerCase()}
                  checked={exchange === type.toLowerCase()}
                  onChange={(e) => setExchange(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="quantity" style={labelStyle}>
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Min Quantity"
            style={isInputFocused ? inputFocusStyle : inputStyle}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>

        {/* Script Name */}
        <div>
          <label htmlFor="scriptName" style={labelStyle}>
            Script Name
          </label>
          <select
            id="scriptName"
            style={isInputFocused ? inputFocusStyle : inputStyle}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
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
          <label style={labelStyle}>Transaction</label>
          <div style={radioGroupStyle}>
            {["BUY", "SELL", "AUTO"].map((type) => (
              <label key={type} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  value={type.toLowerCase()}
                  checked={transaction === type.toLowerCase()}
                  onChange={(e) => setTransaction(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <label style={labelStyle}>Product</label>
          <div style={radioGroupStyle}>
            {["Intraday", "CarryForward(CNC)"].map((prod) => (
              <label key={prod} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  value={prod.toLowerCase()}
                  checked={product === prod.toLowerCase()}
                  onChange={(e) => setProduct(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                {prod}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>More Details</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <input
              placeholder="Creator Name"
              style={isInputFocused ? inputFocusStyle : inputStyle}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <input
              type="number"
              placeholder="Min Capital"
              style={isInputFocused ? inputFocusStyle : inputStyle}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <input
              placeholder="Draw Down"
              style={isInputFocused ? inputFocusStyle : inputStyle}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>ROI</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <input
              placeholder="Enter ROI"
              style={isInputFocused ? inputFocusStyle : inputStyle}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <input
              type="number"
              placeholder="Enter Creator Charge"
              style={isInputFocused ? inputFocusStyle : inputStyle}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <input
              placeholder="Bar Length"
              style={isInputFocused ? inputFocusStyle : inputStyle}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            placeholder="Describe the things..."
            style={{
              ...inputStyle,
              height: "100px",
              resize: "none",
            }}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>

        <button
          type="submit"
          style={isButtonHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Publish;