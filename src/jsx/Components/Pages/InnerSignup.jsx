
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../../Store/Store";
import { getCreateDemoAccountUser, getCreateLiveAccountUser } from "../../../API/useraccount";

const InnerSignup = () => {
  const [accountType, setAccountType] = useState("demo");
  const [leverage, setLeverage] = useState("1:2000");
  const [customLeverage, setCustomLeverage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [startingBalance, setStartingBalance] = useState(10000);
  const [walletPin, setWalletPin] = useState("");
  const [accountNickname, setAccountNickname] = useState("My Account");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userIdFromStore = useAuthStore((state) => state.auth.userId);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = userIdFromStore || localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID is missing. Please log in again.");
    }
  }, [userIdFromStore]);

  const handleLeverageChange = (e) => {
    const value = e.target.value;
    setLeverage(value);
    if (value !== "custom") {
      setCustomLeverage("");
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !userId ||
      !accountNickname ||
      !leverage ||
      !currency ||
      (accountType === "real" && !walletPin)
    ) {
      setError("All fields are required!");
      return;
    }

    if (accountType === "real" && (walletPin.length < 4 || walletPin.length > 6)) {
      setError("Wallet PIN must be 4-6 digits long.");
      return;
    }

    setError("");
    setLoading(true);

    const requestData = {
      userId,
      leverage: leverage === "custom" ? customLeverage : leverage,
      currency,
      accountNickname,

      customLeverage: leverage === "custom" ? customLeverage : null,
      walletPin: accountType === "real" ? walletPin : undefined,
    };

    if (accountType === "demo") {
      requestData.balance = startingBalance;
    }


    try {
      let response;

      if (accountType === "real") {
        response = await getCreateLiveAccountUser(requestData);
      } else {
        response = await getCreateDemoAccountUser(requestData);
      }

      if (response.success) {
        alert("Account Created Successfully!");
        navigate("/webterminal");
      } else {
        setError(response?.message || "Error creating account. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <Link to="/subscription" style={{ textDecoration: "none" }}>
            <Button variant="text" size="small" style={{ marginRight: 16, color: "#362465" }}>
              <ArrowLeft size={20} />
            </Button>
          </Link>

          <Typography
            variant="h5"
            style={{ fontWeight: "bold", color: "#362465", flexGrow: 1, textAlign: "center" }}
          >
            Open New Account
          </Typography>
        </div>

        <FormControl component="fieldset" style={{ marginBottom: 24, width: "100%" }}>
          <RadioGroup
            value={accountType}
            onChange={(e) => {
              const value = e.target.value;
              setAccountType(value);
              setWalletPin("");
            }}
            row
            style={{ justifyContent: "center" }}
          >
            <FormControlLabel
              value="demo"
              control={<Radio style={{ color: "#362465" }} />}
              label={<Typography style={{ color: "#362465" }}>Demo</Typography>}
            />
            <FormControlLabel
              value="real"
              control={<Radio style={{ color: "#362465" }} />}
              label={<Typography style={{ color: "#362465" }}>Real</Typography>}
            />
          </RadioGroup>
        </FormControl>

        {accountType === "demo" && (
          <>
            <Typography
              variant="body2"
              style={{
                marginBottom: 16,
                color: "#555",
                fontSize: "0.95rem",
                textAlign: "center",
              }}
            >
              <strong>Risk-free account:</strong> Trade with virtual money.
            </Typography>
            <TextField
              fullWidth
              id="starting-balance"
              label="Starting Balance *"
              type="number"
              value={startingBalance}
              onChange={(e) => setStartingBalance(e.target.value)}
              placeholder="10000"
              variant="outlined"
              style={{ marginBottom: 16 }}
            />
          </>
        )}

        {accountType === "real" && (
          <Typography
            variant="body2"
            style={{
              marginBottom: 16,
              color: "#555",
              fontSize: "0.95rem",
              textAlign: "center",
            }}
          >
            <strong>Real Account:</strong> Trade with real money and withdraw any profit.
          </Typography>
        )}

        <FormControl fullWidth style={{ marginBottom: 20 }}>
          <InputLabel id="leverage-label">Max Leverage *</InputLabel>
          <Select
            labelId="leverage-label"
            value={leverage}
            onChange={handleLeverageChange}
          >
            <MenuItem value="custom">Custom</MenuItem>
            <MenuItem value="1:2">1:2</MenuItem>
            <MenuItem value="1:20">1:20</MenuItem>
            <MenuItem value="1:50">1:50</MenuItem>
            <MenuItem value="1:100">1:100</MenuItem>
            <MenuItem value="1:200">1:200</MenuItem>
            <MenuItem value="1:400">1:400</MenuItem>
            <MenuItem value="1:500">1:500</MenuItem>
            <MenuItem value="1:600">1:600</MenuItem>
            <MenuItem value="1:800">1:800</MenuItem>
            <MenuItem value="1:1000">1:1000</MenuItem>
            <MenuItem value="1:2000">1:2000</MenuItem>
            <MenuItem value="unlimited">1:Unlimited</MenuItem>
          </Select>
        </FormControl>

        {leverage === "custom" && (
          <TextField
            fullWidth
            label="Enter Custom Leverage *"
            value={customLeverage}
            onChange={(e) => setCustomLeverage(e.target.value)}
            placeholder="e.g., 1:250"
            variant="outlined"
            style={{ marginBottom: 16 }}
          />
        )}

        <FormControl fullWidth style={{ marginBottom: 16 }}>
          <InputLabel id="currency-label">Currency *</InputLabel>
          <Select
            labelId="currency-label"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD - United States Dollar</MenuItem>
            <MenuItem value="EUR">EUR - Euro</MenuItem>
            <MenuItem value="GBP">GBP - British Pound</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          id="account-nickname"
          label="Account Nickname *"
          value={accountNickname}
          onChange={(e) => setAccountNickname(e.target.value)}
          placeholder="Standard"
          variant="outlined"
          style={{ marginBottom: 16 }}
        />

        {accountType === "real" && (
          <TextField
            fullWidth
            id="walletPin"
            label="Wallet Pin *"
            value={walletPin}
            onChange={(e) => setWalletPin(e.target.value)}
            type="password"
            variant="outlined"
            style={{ marginBottom: 16 }}
          />
        )}

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
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create an Account"}
        </Button>

        {error && (
          <Typography
            variant="body2"
            style={{ marginTop: 16, color: "red", textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default InnerSignup;
