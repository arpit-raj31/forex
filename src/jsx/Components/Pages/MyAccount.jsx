import React from "react";
import {Link} from "react-router-dom";
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
  const [tabValue, setTabValue] = React.useState(0);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Accounts</h1>
      <Link to="/new-account">
      <Button
         color="black"
  className="absolute top-4 right-4 bg-[#9466FF] p-3 rounded-md hover:bg-[#362465] hover:text-white transition-colors duration-300 shadow-md"
  startIcon={<span>+</span>}
>
  Open New Account
</Button></Link>
      </div>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} className="mb-6 color-black">
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
            Oldest
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Oldest</MenuItem>
            <MenuItem onClick={handleMenuClose}>Newest</MenuItem>
            <MenuItem onClick={handleMenuClose}>Free Margin</MenuItem>
            <MenuItem onClick={handleMenuClose}>NickName</MenuItem>
          </Menu>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" color="black">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outlined" color="black">
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Account Card */}
      <Card >
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
                <span className="text-3xl font-bold">0</span>
                <span className="text-xl text-muted">.00 USD</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="contained"
                style={{ backgroundColor: "#362465", color: "white" }}
              >
                Trade
              </Button>
              <Button variant="outlined" color="black" >Deposit</Button>
              <Button variant="outlined" color="black">Withdraw</Button>
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
              <span className="font-medium text-black">Exness-MT5Real18</span>
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
            <Button variant="text color-black"><MdEdit /> Change trading password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
