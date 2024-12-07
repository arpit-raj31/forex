import React, { useState } from "react";
import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ReactFlagsSelect from "react-flags-select"; // Import ReactFlagsSelect
import "./../../../style/Navbar.css";


export default function NavHeader() {
  const [selected, setSelected] = useState("US"); // Set default country as US

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="#">
          <img src="/logo.png" className="logo-img" />
        </Link>
      </div>
      <div className="icons">

      <Button className="icon-btn gap-10px">
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => setSelected(code)}
            
          />
        </Button>
        
        <Button className="icon-btn">
          <Settings className="icon" />
          <span className="sr-only"></span>
        </Button>
        
        {/* Country selection dropdown */}
      
        <Button className="icon-btn">
          <Bell className="icon" />
          <span className="sr-only"></span>
        </Button>
        
        <Avatar alt="User" src="/placeholder.svg" className="avatar">
          U
        </Avatar>
      </div>
    </header>
  );
}
