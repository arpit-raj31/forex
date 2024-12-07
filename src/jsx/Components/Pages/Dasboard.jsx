import React, { useState } from "react";
import ReactApexChart from "react-apexcharts"; // Import ReactApexChart
import "./../../../style/Dashboard.css";
 // Ensure the path is correct

const Dashboard = () => {
  const [tradeType, setTradeType] = useState("Buy");
  const [orderType, setOrderType] = useState("Market Order");


  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };
  const chartOptions = {
    series: [
      {
        data: [
          { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
          { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
          { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
          { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
          { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
          { x: new Date(1538787600000), y: [6624.53, 6636.03, 6621.68, 6624.31] },
          { x: new Date(1538789400000), y: [6624.61, 6632.2, 6617, 6626.02] },
          { x: new Date(1538791200000), y: [6627, 6627.62, 6584.22, 6603.02] },
          { x: new Date(1538793000000), y: [6605, 6608.03, 6598.95, 6604.01] },
          { x: new Date(1538794800000), y: [6604.5, 6614.4, 6602.26, 6608.02] },
        ],
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 >Dashboard</h1>
      </header>

      <main className="dashboard-content">
        {/* Left Section */}
        <div className="dashboard-card">
          <h2>Buy & Sell 100+ Coins Instantly</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been.
          </p>

          <div className="image-placeholder">
            <img src="/poster.png" alt="Illustration" className="illustration" />
          </div>
        </div>

        {/* Right Section */}
        <div className="trading-panel">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search here..." className="search-bar" />
          </div>

          {/* Trade Type Tabs */}
          <div className="tab-container">
            <button
              className={`tab ${tradeType === "Buy" ? "active" : ""}`}
              onClick={() => setTradeType("Buy")}
            >
              Buy
            </button>
            <button
              className={`tab ${tradeType === "Sell" ? "active" : ""}`}
              onClick={() => setTradeType("Sell")}
            >
              Sell
            </button>
          </div>

          {/* Order Type Tabs */}
          <div className="tab-container">
            <button
              className={`sub-tab ${orderType === "Market Order" ? "active" : ""}`}
              onClick={() => setOrderType("Market Order")}
            >
              Market Order
            </button>
            <button
              className={`sub-tab ${orderType === "Limit Order" ? "active" : ""}`}
              onClick={() => setOrderType("Limit Order")}
            >
              Limit Order
            </button>
          </div>

          {/* Balance Info */}
          <div className="balance">Balance: $3,123.9</div>

          {/* Input Fields */}
          <h4 className="text1">
            Price
            <input type="text" placeholder="Price" className="input-field" />
          </h4>
          <h4 className="text1">
            Amount
            <input type="text" placeholder="Amount" className="input-field" />
          </h4>
          <div className="total">
            Total: <span>0.00 USDT</span>
          </div>
          <button className="primary-button">{tradeType} BTC</button>
        </div>
      </main>

      <footer className="stats-container">
        <div className="stats-card">
          <h3>$2,478.90</h3>
          <p>Total Balance</p>
          <p>0.11857418 BTC</p>
        </div>
        <div className="stats-card">
          <h3>$3,27.23</h3>
          <p>Profit & Loss</p>
          <p className="profit">+3.02%</p>
        </div>
        <div className="stats-card">
          <h3>$2,478.90</h3>
          <p>Total Deposit</p>
        </div>
        <div id="chart">
          <ReactApexChart
            options={chartOptions.options}
            series={chartOptions.series}
            type="candlestick"
            height={350}
          />
        </div>
        {/* <div className="order-tabs">
        <button
          className={`tab ${activeTab === "openOrders" ? "active" : ""}`}
          onClick={() => handleTabSwitch("openOrders")}
        >
          Open Orders
        </button>
        <button
          className={`tab ${activeTab === "orderHistory" ? "active" : ""}`}
          onClick={() => handleTabSwitch("orderHistory")}
        >
          Order History
        </button>
      </div>
      
      {activeTab === "openOrders" && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {openOrdersData.map((order, index) => (
                <tr key={index}>
                  <td className={order.status === "open" ? "open" : ""}>
                    {order.price}
                  </td>
                  <td>{order.size}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

        {activeTab === "orderHistory" && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderHistoryData.map((order, index) => (
                <tr key={index}>
                  <td className={order.status === "completed" ? "completed" : ""}>
                    {order.price}
                  </td>
                  <td>{order.size}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      </footer>
    </div>
  );
};

export default Dashboard;
