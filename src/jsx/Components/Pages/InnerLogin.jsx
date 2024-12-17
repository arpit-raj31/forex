import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const InnerLogin = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = () => {
    // Simple validation for demo purposes
    if (nickname === "demoUser" && password === "password123") {
      // Redirect to "myAccount" after successful login
      navigate('account'); // This will navigate to the myAccount page
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{height:"100vh"}}>
      <Card
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "40px 20px",
        marginTop: "100px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        

          <Typography
            variant="h5"
            style={{ fontWeight: "bold", color: "#362465", flexGrow: 1, textAlign: "center" }}
          >
            Login
          </Typography>
        </div>

        <TextField
          fullWidth
          id="nickname"
          label="User Nickname *"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          variant="outlined"
          style={{ marginBottom: 16 }}
        />

        <TextField
          fullWidth
          id="password"
          type="password"
          label="Password *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          style={{ marginBottom: 16 }}
        />

        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#362465",
            color: "white",
            padding: "12px 0",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          variant="caption"
          style={{
            marginTop: 16,
            display: "block",
            color: "#777",
            fontSize: "0.85rem",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link to="/new-account" style={{ color: "#362465", textDecoration: "none" }}>
            Sign up here
          </Link>
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
};

export default InnerLogin;
