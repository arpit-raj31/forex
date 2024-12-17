import React from "react";

const Withdrawal = () => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "250px",
    backgroundColor: "#fff",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  };

  const subTitleStyle = {
    fontSize: "14px",
    color: "#777",
    margin: "5px 0",
  };

  const recommendedTagStyle = {
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "12px",
    padding: "2px 8px",
    borderRadius: "15px",
    marginBottom: "10px",
  };

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    padding: "20px",
  };

  return (
    <div style={{height:"100vh"}}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>Withdraw</h2>
      <h4 style={{ fontSize: "18px", color: "#555" }}>All payment methods</h4>

      <div style={cardContainerStyle}>
        {/* UPI ID Card */}
        <div style={cardStyle}>
          <div style={recommendedTagStyle}>Recommended</div>
          <div>
            <img src="/image1.png" alt="UPI" style={{ width: "40px", marginBottom: "10px" }} />
          </div>
          <h3 style={titleStyle}>UPI ID</h3>
          <p style={subTitleStyle}>Processing time Instant - 45 minutes</p>
          <p style={subTitleStyle}>Fee 0 %</p>
          <p style={subTitleStyle}>Limits 30 - 300 USD</p>
        </div>

        {/* Bank Transfer Direct Card */}
        <div style={cardStyle}>
          <div>
            <img src="/image2.png" alt="Bank Transfer" style={{ width: "40px", marginBottom: "10px" }} />
          </div>
          <h3 style={titleStyle}>Bank Transfer Direct</h3>
          <p style={subTitleStyle}>Processing time 30 minutes - 3 hours</p>
          <p style={subTitleStyle}>Fee 0 %</p>
          <p style={subTitleStyle}>Limits 1,000 - 10,000 USD</p>
        </div>

      

        {/* Online Bank Card */}
        <div style={cardStyle}>
          <div>
            <img src="/image4.png" alt="Online Bank" style={{ width: "40px", marginBottom: "10px" }} />
          </div>
          <h3 style={titleStyle}>Pay Pal</h3>
          <p style={subTitleStyle}>Processing time 30 minutes - 1 hour</p>
          <p style={subTitleStyle}>Fee 0 %</p>
          <p style={subTitleStyle}>Limits 50 - 2,000 USD</p>
        </div>

        {/* UPI Express Card */}
        <div style={cardStyle}>
          <div>
            <img src="/image 5.jpg" alt="UPI Express" style={{ width: "40px", marginBottom: "10px" }} />
          </div>
          <h3 style={titleStyle}>Binance Pay</h3>
          <p style={subTitleStyle}>Processing time Instant - 1 hour</p>
          <p style={subTitleStyle}>Fee 0 %</p>
          <p style={subTitleStyle}>Limits 50 - 1,000 USD</p>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
