
import React , { useState }from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { ChevronDown, Copy, Grid, List, MoreVertical } from "lucide-react";
export default function MyAccount() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0); // Tab value state (Real = 0, Demo = 1)
  const [accountBalance, setAccountBalance] = React.useState(0); // Account balance state
  const [selectedOption, setSelectedOption] = useState("Oldest");
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    handleMenuClose(); // Close the menu when an option is selected
  };


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Set initial amount based on the selected tab
    if (newValue === 1) {
      setAccountBalance(5000); // Set balance to 5000 for Demo tab
    } else {
      setAccountBalance(0); // Set balance to 0 for Real tab
    }
  };
 

  return (
    <div style={{height:"100vh"}}>
   <div className="container mx-auto p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold text-[#362465]">My Accounts</h1>

  {/* Buttons Section */}
  <div className="flex gap-4">
    {/* New Account Button */}
    <Link to="/subscription">
      <Button
        color="black"
        className="bg-[#9466FF] p-3 rounded-md hover:bg-[#362465] hover:text-white transition-colors duration-300 shadow-md"
        startIcon={<span>+</span>}
      >
        Open New Account
      </Button>
    </Link>

    {/* Login Button */}
  
  </div>
</div>



  <Tabs 
  value={tabValue} 
  onChange={handleTabChange} 
  className="mb-6" 
  sx={{
    "& .MuiTabs-indicator": {
      backgroundColor: "#362465",  // Set indicator color to match your theme
    },
    "& .MuiTab-root": {
      color: "#362465",  // Default tab color
      fontWeight: "bold", // Add some emphasis to the tab labels
      textTransform: "none", // Keep the text case as is
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#9466FF", // Change color of active tab
    },
  }}
>
  <Tab label="Real" />
  <Tab label="Demo" />
</Tabs>
      {/* Dropdown and View Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button
            color="black"
            variant="outlined"
            onClick={handleMenuClick}
            endIcon={<ChevronDown className="h-4 w-4" />}
          >
              {selectedOption} {/* Show the selected option */}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
             <MenuItem onClick={() => handleMenuItemClick("Oldest")}>Oldest</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Newest")}>Newest</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Free Margin")}>Free Margin</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("NickName")}>NickName</MenuItem>
      </Menu>
        </div>
        <div className="flex flex-wrap gap-2 justify-start">
  <Button variant="outlined" color="black" className="flex-shrink-0">
    <List className="h-4 w-4" />
  </Button>
  <Button variant="outlined" color="black" className="flex-shrink-0">
    <Grid className="h-4 w-4" />
  </Button>
</div>
      </div>

      {/* Account Card */}
      <Card>
        <CardContent>
          {/* Card Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="outlined">Real</Badge>
                <Badge variant="outlined">MT5</Badge>
                <Badge variant="outlined">Standard</Badge>
                <span className="text-muted"># 200085527</span>
              </div>
              <div>
                <span className="text-3xl font-bold">{accountBalance}</span>
                <span className="text-xl text-muted"> USD</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
            <a href="/webterminal" target="_blank" rel="noopener noreferrer">
             <Button
                variant="contained"
                style={{ backgroundColor: "#362465", color: "white" }}
              >
                Trade
              </Button></a>
              <Link to="/deposit">
                <Button variant="outlined" color="black">Deposit</Button>
              </Link>
              <Link to="/withdrawal">
                <Button variant="outlined" color="black">Withdraw</Button>
              </Link>
              <Button variant="text" color="black">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Actual leverage</span>
                <span>1:200 (max 1:200)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Unrealized P&L</span>
                <span>0.00 USD</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Free margin</span>
                <span>0.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Equity</span>
                <span>0.00 USD</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span>Server</span>
              <span className="font-medium text-black">Bizglobal-MT5Real18</span>
              <Button variant="text">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span>MT5 login</span>
              <span className="font-medium text-black">200085527</span>
              <Button variant="text">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Button variant="text" color="black">
              <MdEdit /> Change trading password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
