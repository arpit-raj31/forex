export const MenuList = [
    // Dashboard
    {
      title: 'Dashboard',
      classsChange: 'mm-collapse',
      iconStyle: <i className="material-icons">grid_view</i>,
    
    },
    { title: 'My Account', to: 'banking' },
    { title: 'Deposit', to: 'dashboard' },
    { title: 'Withdrawal', to: 'dashboard' },
    { title: 'Transaction History', to: 'history' },
  
    // Trading
    {
      title: 'Analytics',
      classsChange: 'mm-collapse',
      iconStyle: <i className="material-icons">trending_up</i>,
      content: [
        { title: 'Economic Calendar', to: 'market' },
        { title: 'Analyst View', to: 'ico-listing' },
        { title: 'Market News', to: 'p2p' },
      ],
    },
    { title: 'Social Trading', to: '' },
  
    // Crypto
    {
      title: 'Performance',
      classsChange: 'mm-collapse',
      iconStyle: <i className="material-icons">currency_bitcoin</i>,
      content: [
        { title: 'Summary', to: 'crypto' },
        { title: 'History of Order', to: '' },
        { title: 'CryptoForex Benefits', to: '' },
      ],
    },
  
    // Support Hub
    { title: 'Support Hub', to: '' },
  
    // Settings
    {
      title: 'Settings',
      classsChange: 'mm-collapse',
      iconStyle: <i className="material-icons">app_registration</i>,
      content: [
        { title: 'Security Settings', to: 'app-profile' },
        { title: 'Trading Terminals', to: 'edit-profile' },
        { title: 'Trading Conditions', to: 'post-details' },
        { title: 'Virtual Private Server', to: '' },
      ],
    },
  ];
  