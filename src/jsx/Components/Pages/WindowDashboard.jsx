import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./../../../style/Dashboard.css";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import dayjs from "dayjs";
import WindowNavbar from "./WindowNavbar";

const initialInstruments = [
    { symbol: 'BTC', bid: '101784.15', ask: '101812.95', trending: 'up' },
    { symbol: 'XAU/USD', bid: '2648.392', ask: '2648.552', trending: 'down' },
    { symbol: 'EUR/USD', bid: '1.05027', ask: '1.05036', trending: 'up' },
    { symbol: 'GBP/USD', bid: '1.26195', ask: '1.26206', trending: 'down' },
    { symbol: 'USD/JPY', bid: '153.633', ask: '153.650', trending: 'up' },
];

const initialTrades = [
    { symbol: 'EUR/USD', type: 'Sell', volume: 2.89, openPrice: 1.05003, closePrice: 1.04619, pl: 1109.76 },
    { symbol: 'EUR/USD', type: 'Buy', volume: 2.89, openPrice: 1.05016, closePrice: 1.04985, pl: -89.59 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 0.01, openPrice: 1.05124, closePrice: 1.05019, pl: 1.05 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 2.89, openPrice: 1.05003, closePrice: 1.04619, pl: 1109.76 },
    { symbol: 'EUR/USD', type: 'Buy', volume: 2.89, openPrice: 1.05016, closePrice: 1.04985, pl: -89.59 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 0.01, openPrice: 1.05124, closePrice: 1.05019, pl: 1.05 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 2.89, openPrice: 1.05003, closePrice: 1.04619, pl: 1109.76 },
    { symbol: 'EUR/USD', type: 'Buy', volume: 2.89, openPrice: 1.05016, closePrice: 1.04985, pl: -89.59 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 0.01, openPrice: 1.05124, closePrice: 1.05019, pl: 1.05 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 2.89, openPrice: 1.05003, closePrice: 1.04619, pl: 1109.76 },
    { symbol: 'EUR/USD', type: 'Buy', volume: 2.89, openPrice: 1.05016, closePrice: 1.04985, pl: -89.59 },
    { symbol: 'EUR/USD', type: 'Sell', volume: 0.01, openPrice: 1.05124, closePrice: 1.05019, pl: 1.05 },
];




const WindowDashboard = () => {
    const [selectedOption, setSelectedOption] = useState("price");
    const [calculatedPips, setCalculatedPips] = useState(0);
    const [calculatedUsd, setCalculatedUsd] = useState(0);
    const [calculatedPercent, setCalculatedPercent] = useState(0);
    const [tradeType, setTradeType] = useState("Buy");
    const [volume, setVolume] = useState(0.01);
    const [takeProfit, setTakeProfit] = useState(0.01);
    const [stopLoss, setStopLoss] = useState(0.01);
    const [showMore, setShowMore] = useState(false);
    const [instruments, setInstruments] = useState(initialInstruments);
    const [trades, setTrades] = useState(initialTrades);
    const [activeTab, setActiveTab] = useState('closed');
    const [searchTerm, setSearchTerm] = useState('');

    const calculateMultipliers = (value, option) => {
        let pips = 0;
        let usd = 0;
        let percent = 0;

        switch (option) {
            case "price":
                pips = value * 10;
                usd = value * volume * 100;
                percent = (value / 100) * volume;
                break;
            case "equity":
                pips = value * 20;
                usd = value * volume * 200;
                percent = (value / 150) * volume;
                break;
            case "money":
                pips = value * 15;
                usd = value * volume * 50;
                percent = (value / 80) * volume;
                break;
            case "pips":
                pips = value;
                usd = value * volume * 50;
                percent = (value / 120) * volume;
                break;
            default:
                break;
        }

        setCalculatedPips(pips);
        setCalculatedUsd(usd);
        setCalculatedPercent(percent);
    };

    const [state, setState] = useState({
        series: [
            {
                name: "candle",
                data: [
                    {
                        x: new Date(1538778600000),
                        y: [6629.81, 6650.5, 6623.04, 6633.33],
                    },
                    { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
                    {
                        x: new Date(1538782200000),
                        y: [6630.71, 6648.95, 6623.34, 6635.65],
                    },
                    { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
                    { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
                    {
                        x: new Date(1538787600000),
                        y: [6624.53, 6636.03, 6621.68, 6624.31],
                    },
                    { x: new Date(1538789400000), y: [6624.61, 6632.2, 6617, 6626.02] },
                    { x: new Date(1538791200000), y: [6627, 6627.62, 6584.22, 6603.02] },
                    { x: new Date(1538793000000), y: [6605, 6608.03, 6598.95, 6604.01] },
                    { x: new Date(1538794800000), y: [6604.5, 6614.4, 6602.26, 6608.02] },
                    {
                        x: new Date(1538796600000),
                        y: [6608.02, 6610.68, 6601.99, 6608.91],
                    },
                ],
            },
        ],
        options: {
            chart: {
                height: 650,
                type: "candlestick",
            },
            title: {
                text: "Forex Chart",
                align: "left",
                color: "#362465",
            },
            annotations: {
                xaxis: [
                    {
                        x: "Oct 06 14:00",
                        borderColor: "#00E396",
                        label: {
                            borderColor: "#00E396",
                            style: {
                                fontSize: "12px",
                                color: "#fff",
                                background: "#00E396",
                            },
                            orientation: "horizontal",
                            offsetY: 7,
                            text: "Annotation Test",
                        },
                    },
                ],
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: "#362465",
                        downward: "grey",
                    },
                    wick: {
                        color: "#000000",
                    },
                    border: {
                        upward: "#362465",
                        downward: "black",
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
            xaxis: {
                type: "category",
                labels: {
                    formatter: function (val) {
                        return dayjs(val).format("MMM DD HH:mm");
                    },
                },
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
        },
    });




    // Simulate real-time price updates
    useEffect(() => {
        const interval = setInterval(() => {
            setInstruments(prevInstruments =>
                prevInstruments.map(instrument => ({
                    ...instrument,
                    bid: generateRandomPrice(parseFloat(instrument.bid.replace(',', ''))),
                    ask: generateRandomPrice(parseFloat(instrument.ask.replace(',', ''))),
                    trending: Math.random() > 0.5 ? 'up' : 'down'
                }))
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Filter instruments based on search term
    const filteredInstruments = instruments.filter(instrument =>
        instrument.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const generateRandomPrice = (base) => {
        return (base + Math.random() * 0.001).toFixed(6);
    };



    return (
        <div className="dashboard-container1">
            <WindowNavbar/>

            <main className="dashboard-content mt-12">

                {/* Right Pair Section */}

                <div className="w-80 bg-[#362465] shadow-lg border border-gray-200 p-4 text-white flex flex-col">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 mb-4 mt-8 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    {/* Favorites Header */}
                    <h3 className="text-base font-semibold text-white mb-4">Favorites</h3>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="text-sm text-white border-b border-gray-300">
                                    <th className="text-left py-2 px-2">Symbol</th>
                                    <th className="text-right py-2 px-2">Bid</th>
                                    <th className="text-right py-2 px-2">Ask</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInstruments.map((instrument) => (
                                    <tr key={instrument.symbol} className="text-sm border-b border-gray-200 hover:bg-gray-50 transition">
                                        <td className="py-2 px-2 flex items-center">
                                            <span className="text-yellow-500 mr-2">★</span>
                                            {instrument.symbol}
                                        </td>
                                        <td
                                            className={`text-right py-2 px-2 ${instrument.trending === 'up' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {instrument.bid}
                                        </td>
                                        <td
                                            className={`text-right py-2 px-2 ${instrument.trending === 'up' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {instrument.ask}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* end */}


                {/* Main Section */}

                <div className="maincontainor chart-section  flex flex-col bg-white text-gray-900 h-screen shadow-md">
                    {/* Chart Section */}
                    <div className="chart-section flex-1 p-4 mb-3 border-b border-gray-300">
                        <ReactApexChart
                            options={state.options}
                            series={state.series}
                            type="candlestick"
                            height={state.options.chart.height}
                        />
                    </div>

                    {/* Adjustable Trade Tabs Section */}
                    <div className="resize-y overflow-hidden  pt-2 border-t border-gray-300 bg-gray-50">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4 overflow-hidden ">
                            {['open', 'pending', 'closed'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md shadow-lg transition-transform transform duration-200 ease-in-out ${activeTab === tab
                                        ? 'bg-[#362465] text-white scale-105'
                                        : 'bg-gray-200 text-gray-800 hover:bg-[#594A91] hover:text-white hover:scale-105'
                                        } focus:outline-none`}
                                >
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'closed' && (
                            <div className="bg-white rounded-lg shadow-lg">
                                {/* Scrollable Table */}
                                <div className="overflow-auto max-h-80 rounded-md border border-gray-300">
                                    <table className="w-full table-auto border-collapse text-sm">
                                        {/* Fixed Header */}
                                        <thead className="sticky top-0 bg-gray-200 z-10 shadow-md">
                                            <tr className="text-gray-700 border-b border-gray-300">
                                                <th className="text-left py-2 px-4">Symbol</th>
                                                <th className="text-left py-2 px-4">Type</th>
                                                <th className="text-right py-2 px-4">Volume, lot</th>
                                                <th className="text-right py-2 px-4">Open price</th>
                                                <th className="text-right py-2 px-4">Close price</th>
                                                <th className="text-right py-2 px-4">P/L, USD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trades.map((trade, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-150"
                                                >
                                                    <td className="py-2 px-4">{trade.symbol}</td>
                                                    <td
                                                        className={`py-2 px-4 font-semibold ${trade.type === 'Buy' ? 'text-green-600' : 'text-red-600'}`}
                                                    >
                                                        {trade.type}
                                                    </td>
                                                    <td className="text-right py-2 px-4">{trade.volume}</td>
                                                    <td className="text-right py-2 px-4">{trade.openPrice}</td>
                                                    <td className="text-right py-2 px-4">{trade.closePrice}</td>
                                                    <td
                                                        className={`text-right py-2 px-4 font-semibold ${trade.pl > 0 ? 'text-green-500' : 'text-red-500'}`}
                                                    >
                                                        {trade.pl > 0 ? '+' : ''}{trade.pl.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Footer Text */}
                                <div className="text-sm text-gray-500 mt-4">
                                    Showing closed orders for the last 11 days
                                </div>
                            </div>
                        )}
                    </div>

                </div>


                {/* Right Section - Trading Panel */}
                <div className="trading-panel">


                    <div className="trading-form mt-8">
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

                        {/* Form Fields */}
                        <div className="form-container">
                            {/* Volume */}
                            <div className="form-group">
                                <label>Volume</label>
                                <div className="volume-control">
                                    <button
                                        onClick={() => setVolume(Math.max(0.01, volume - 0.01))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={volume.toFixed(2)}
                                        onChange={(e) =>
                                            setVolume(
                                                Math.max(0.01, parseFloat(e.target.value) || 0.01)
                                            )
                                        }
                                        step="0.00"
                                        min="0.00"
                                    />
                                    <button onClick={() => setVolume(volume + 0.01)}>+</button>
                                </div>
                            </div>

                            <div className="form-group w-full max-w-sm  border-2 border-none  rounded-lg bg-white">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-lg font-semibold text-white">Take Profit</label>
                                    <button className="text-white">?</button>
                                </div>

                                <div className="flex items-center justify-between space-x-2 border text-black bg-white p-3 rounded-lg">
                                    {/* Input field */}
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={takeProfit}
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value) || 0.00;
                                            setTakeProfit(value);
                                            calculateMultipliers(value, selectedOption);
                                        }}
                                        className="w-24 text-black bg-transparent border-none focus:outline-none"
                                    />

                                    {/* 'X' symbol */}
                                    <span className="text-black">X</span>

                                    {/* Dropdown Menu */}
                                    <select
                                        className="bg-transparent active:bg-[#362465]  text-black border-none focus:outline-none"
                                        value={selectedOption}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedOption(value);
                                            calculateMultipliers(takeProfit, value);
                                        }}
                                    >
                                        <option value="price">Price</option>
                                        <option value="equity">Equity %</option>
                                        <option value="money">Money</option>
                                        <option value="pips">Pips</option>
                                    </select>

                                    {/* Decrement Button */}


                                    <button
                                        onClick={() =>
                                            setTakeProfit((prev) => Math.max(0.0, prev - 0.00))
                                        }
                                        className="bg-[#362465] text-white w-8 h-8 rounded-lg hover:bg-[#4A1F73] focus:outline-none"
                                    >
                                        -
                                    </button>

                                    {/* Increment Button */}
                                    <button
                                        onClick={() => setTakeProfit((prev) => prev + 0.01)}
                                        className="bg-[#362465] text-white w-8 h-8 rounded-lg hover:bg-[#4A1F73] focus:outline-none"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Additional Information below the input */}
                                <div className="text-sm text-[#362465] flex justify-between mt-2">
                                    <span>0.0 pips</span>
                                    <span>0.00 USD</span>
                                    <span>0.00 %</span>
                                </div>
                                </div>

<div className="form-group w-full max-w-sm  border-2 border-none  rounded-lg bg-white">
    <div className="flex justify-between items-center mb-1">
        <label className="text-lg font-semibold text-white">Stop Loss</label>
        <button className="text-white">?</button>
    </div>

    <div className="flex items-center justify-between space-x-2 border text-black bg-white p-3 rounded-lg">
        {/* Input field */}
        <input
            type="text"
            placeholder=""
            value={stopLoss}
            onChange={(e) => {
                const value = parseFloat(e.target.value) || 0.00;
                setStopLoss(value);
                calculateMultipliers(value, selectedOption);
            }}
            className="w-24 text-black bg-transparent border-none focus:outline-none"
        />

        {/* 'X' symbol */}
        <span className="text-black">X</span>

        {/* Dropdown Menu */}
        <select
            className="bg-transparent active:bg-[#362465]  text-black border-none focus:outline-none"
            value={selectedOption}
            onChange={(e) => {
                const value = e.target.value;
                setSelectedOption(value);
                calculateMultipliers(takeProfit, value);
            }}
        >
            <option value="price">Price</option>
            <option value="equity">Equity %</option>
            <option value="money">Money</option>
            <option value="pips">Pips</option>
        </select>

        {/* Decrement Button */}

        <button
            onClick={() =>
                setStopLoss((prev) => Math.max(0.0, prev - 0.01)) // Fixed for Stop Loss
            }
            className="bg-[#362465] text-white w-8 h-8 rounded-lg hover:bg-[#4A1F73] focus:outline-none"
        >
            -
        </button>

        {/* Stop Loss Increment Button */}
        <button
            onClick={() => setStopLoss((prev) => prev + 0.01)} // Fixed for Stop Loss
            className="bg-[#362465] text-white w-8 h-8 rounded-lg hover:bg-[#4A1F73] focus:outline-none"
        >
            +
        </button>



    </div>

    {/* Additional Information below the input */}
    <div className="text-sm text-[#362465] flex justify-between mt-2">
        <span>0.0 pips</span>
        <span>0.00 USD</span>
        <span>0.00 %</span>
    </div>
</div>


<div className="form-actions">
    <button className="confirm-btn">
        Confirm {tradeType} {volume.toFixed(2)} lots
    </button>
    <button className="cancel-btn">Cancel</button>
</div>
</div>
</div>


<div className="bg-white mt-12 rounded-lg text-[#362465">
<p className="flex justify-between">
<span>Fees:</span> <span>~ 0.09</span>
</p>
<p className="flex justify-between">
<span>Leverage:</span> <span>0.0</span>
</p>
<p className="flex justify-between">
<span>Margin:</span> <span>0.09</span>
</p>

{showMore && (
<>
    <p className="flex justify-between">
        <span>Swap:</span> <span>~ 0.09</span>
    </p>
    <p className="flex justify-between">
        <span>Pip Value:</span> <span>~ 0.09</span>
    </p>
    <p className="flex justify-between">
        <span>Volume in Units:</span> <span>~ 0.09</span>
    </p>
    <p className="flex justify-between">
        <span>Volume in USD:</span> <span>~ 0.09</span>
    </p>
</>
)}

<button
onClick={() => setShowMore(!showMore)}
className="text-[#362465] mt-2 rounded-lg transition duration-200"
>
{showMore ? (
    <>Less <MdExpandLess /></>
) : (
    <>
        <span className="border-b-2 border-[#362465]">More</span> <MdExpandMore />
    </>
)}
</button>

</div>

</div>


</main>
</div>
);
};

export default WindowDashboard;
