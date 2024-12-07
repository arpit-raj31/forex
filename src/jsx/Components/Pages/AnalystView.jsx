import React, { useState } from 'react';

const AnalystView = () => {
  // Dummy news data
  const newsData = [
    // Forex
    { category: 'Forex', title: 'EUR/USD Hits New Highs', description: 'Euro strengthens against the dollar as market stabilizes.', time: '3:50 PM', trend: 'up' },
    { category: 'Forex', title: 'USD/JPY Falls', description: 'Dollar weakens against the Yen amid economic uncertainty.', time: '3:30 PM', trend: 'down' },
    
    // Crypto
    { category: 'Crypto', title: 'Bitcoin Nears $40K', description: 'BTC surges after positive regulatory news.', time: '3:47 PM', trend: 'up' },
    { category: 'Crypto', title: 'Ethereum 2.0 Update', description: 'Ethereum’s network upgrade boosts investor confidence.', time: '3:35 PM', trend: 'up' },
    
    // Stocks
    { category: 'Stocks', title: 'Tech Stocks Rally', description: 'Apple and Microsoft lead a strong recovery in tech sector.', time: '3:45 PM', trend: 'up' },
    { category: 'Stocks', title: 'Banking Sector Declines', description: 'Major banks see a dip due to rising interest rates.', time: '3:20 PM', trend: 'down' },
    
    // Indices
    { category: 'Indices', title: 'S&P 500 Soars', description: 'The index hits an all-time high on positive market sentiment.', time: '3:40 PM', trend: 'up' },
    { category: 'Indices', title: 'Dow Jones Drops', description: 'Economic fears push the Dow into negative territory.', time: '3:10 PM', trend: 'down' },
    
    // Commodities
    { category: 'Commodities', title: 'Gold Prices Stable', description: 'Gold remains steady amid global uncertainty.', time: '3:50 PM', trend: 'neutral' },
    { category: 'Commodities', title: 'Crude Oil Prices Surge', description: 'Oil prices rise as OPEC cuts production.', time: '3:30 PM', trend: 'up' },
  ];

  // State to track the current active tab
  const [activeTab, setActiveTab] = useState('Forex');

  // Filter news based on the active tab
  const filteredNews = Array.isArray(newsData)
    ? newsData.filter((news) => news.category === activeTab)
    : [];

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Analyst News</h1>

      {/* Tabs for navigation */}
      <div style={tabsContainerStyle}>
        {['Forex', 'Crypto', 'Stocks', 'Indices', 'Commodities'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            style={{
              ...tabStyle,
              backgroundColor: activeTab === category ? '#007BFF' : '#ECECEC',
              color: activeTab === category ? '#FFF' : '#000',
              fontWeight: activeTab === category ? 'bold' : 'normal',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News List */}
      <div style={newsContainerStyle}>
        {filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <div key={index} style={newsCardStyle}>
              <h3 style={{ color: news.trend === 'up' ? 'green' : news.trend === 'down' ? 'red' : '#888', marginBottom: '10px' }}>
                {news.title}
              </h3>
              <p style={{ marginBottom: '10px', lineHeight: '1.5' }}>{news.description}</p>
              <small style={{ color: '#888' }}>{news.time}</small>
            </div>
          ))
        ) : (
          <p style={noNewsStyle}>No news available for {activeTab}.</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  maxWidth: '1200px',
  margin: 'auto',
  marginTop:"80px",
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#FAFAFA',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
};

const tabsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '20px',
};

const tabStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const newsContainerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#FFF',
};

const newsCardStyle = {
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
  marginBottom: '10px',
};

const noNewsStyle = {
  textAlign: 'center',
  color: '#888',
  padding: '20px 0',
};

export default AnalystView;
