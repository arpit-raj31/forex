import React, { useState } from "react";

const Analyst = () => {
  // Dummy news data
  const newsData = [
    { category: "Forex", title: "EUR/USD Hits New Highs", description: "Euro strengthens against the dollar as market stabilizes.", time: "3:50 PM", trend: "up" },
    { category: "Forex", title: "USD/JPY Falls", description: "Dollar weakens against the Yen amid economic uncertainty.", time: "3:30 PM", trend: "down" },
    { category: "Crypto", title: "Bitcoin Nears $40K", description: "BTC surges after positive regulatory news.", time: "3:47 PM", trend: "up" },
    { category: "Crypto", title: "Ethereum 2.0 Update", description: "Ethereum’s network upgrade boosts investor confidence.", time: "3:35 PM", trend: "up" },
    { category: "Stocks", title: "Tech Stocks Rally", description: "Apple and Microsoft lead a strong recovery in tech sector.", time: "3:45 PM", trend: "up" },
    { category: "Stocks", title: "Banking Sector Declines", description: "Major banks see a dip due to rising interest rates.", time: "3:20 PM", trend: "down" },
    { category: "Indices", title: "S&P 500 Soars", description: "The index hits an all-time high on positive market sentiment.", time: "3:40 PM", trend: "up" },
    { category: "Indices", title: "Dow Jones Drops", description: "Economic fears push the Dow into negative territory.", time: "3:10 PM", trend: "down" },
    { category: "Commodities", title: "Gold Prices Stable", description: "Gold remains steady amid global uncertainty.", time: "3:50 PM", trend: "neutral" },
    { category: "Commodities", title: "Crude Oil Prices Surge", description: "Oil prices rise as OPEC cuts production.", time: "3:30 PM", trend: "up" },
  ];

  const [activeTab, setActiveTab] = useState("Forex");

  const filteredNews = Array.isArray(newsData)
    ? newsData.filter((news) => news.category === activeTab)
    : [];

  const tabClasses = (category) =>
    `px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
      activeTab === category ? "bg-blue-600 text-white font-semibold" : "bg-gray-200 text-gray-700"
    }`;

  const trendColors = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="font-sans p-6 mx-auto mt-20 max-w-4xl border border-gray-300 rounded-lg bg-gray-50 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Analyst News</h1>

      {/* Tabs */}
      <div className="flex justify-around mb-6">
        {["Forex", "Crypto", "Stocks", "Indices", "Commodities"].map((category) => (
          <button key={category} onClick={() => setActiveTab(category)} className={tabClasses(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="h-96 overflow-y-auto p-4 border border-gray-300 rounded-lg bg-white">
        {filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <h3 className={`text-lg font-semibold mb-2 ${trendColors(news.trend)}`}>{news.title}</h3>
              <p className="text-gray-700 mb-2">{news.description}</p>
              <small className="text-gray-500">{news.time}</small>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No news available for {activeTab}.</p>
        )}
      </div>
    </div>
  );
};

export default Analyst;
