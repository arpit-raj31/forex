import React, { useState } from 'react';

const strategies = [
  {
    name: 'GOLDY NIFTY',
    type: 'RETAIL',
    overview: 'Overview of Last month',
    amount: '₹ 11,596',
    percentage: '77.31%',

    performanceClass: 'positive',
    users: [{ id: 1, accountId: 'ACC789', name: 'Alice Johnson', subscribeDate: '2024-03-05' }],
  },
  {
    name: 'GOLDY BANKNIFTY',
    type: 'RETAIL',
    overview: 'Overview of Last month',
    amount: '₹ 603',
    percentage: '4.02%',
    tags: ['NSE-OPTIONS', 'intraday', 'BANKNIFTY'],
    performanceClass: 'positive',
    users: [
      { id: 1, accountId: 'ACC123', name: 'John Doe', subscribeDate: '2024-01-10' },
      { id: 2, accountId: 'ACC456', name: 'Jane Smith', subscribeDate: '2024-02-15' },
    ],
  },
];

const StrategyCard = ({ strategy, onUserListClick }) => {
  const cardStyle = {
    backgroundColor: '#362465',
    borderRadius: '10px',
    marginTop: '40px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    color: '#fff',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const typeStyle = {
    backgroundColor: '#3a3a3a',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '12px',
    color: '#fff',
  };


  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  };

  const buttonStyle = {
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
  };
  const subscribedStyle = { ...buttonStyle, backgroundColor: '#757575', color: '#fff' };
  const userListStyle = { ...buttonStyle, backgroundColor: '#007bff', color: '#fff' };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h3>{strategy.name}</h3>
        <span style={typeStyle}>{strategy.type}</span>
      </div>
      <p>{strategy.overview}</p>
      <h2>
        {strategy.amount} <span>({strategy.percentage})</span>
      </h2>
   
      <div style={buttonsContainerStyle}>
      <button style={subscribedStyle}>Subscribed</button>
        <button style={userListStyle} onClick={() => onUserListClick(strategy)}>
          User List
        </button>
      </div>
    </div>
  );
};

const UserListPopup = ({ strategy, onClose }) => {
  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    width: '500px',
    color: '#362465',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const thStyle = {
    backgroundColor: '#362465',
    color: '#fff',
    textAlign: 'left',
    padding: '10px',
  };

  const tdStyle = {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const closeButtonStyle = {
    marginTop: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={popupStyle}>
        <h3>User List - {strategy.name}</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>Account ID</th>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Subscribe Date</th>
            </tr>
          </thead>
          <tbody>
            {strategy.users.map((user, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{user.accountId}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.subscribeDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={closeButtonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

const AllStrategies = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const handleUserListClick = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleClosePopup = () => {
    setSelectedStrategy(null);
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    color: '#362465',
    fontFamily: 'Arial, sans-serif',
  };

  const cardContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2>All Strategies</h2>
      <div style={cardContainerStyle}>
        {strategies.map((strategy, index) => (
          <StrategyCard key={index} strategy={strategy} onUserListClick={handleUserListClick} />
        ))}
      </div>
      {selectedStrategy && (
        <UserListPopup strategy={selectedStrategy} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default AllStrategies;
