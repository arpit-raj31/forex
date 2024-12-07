import React from "react";

const Footer = () => {
  var d = new Date();

  const footerStyle = {
    backgroundColor: "#362465",
    padding: "20px",
    color: "#fff",
    textAlign: "center",
   position :"relative"
  }

  const copyrightStyle = {
    fontSize: "14px",
    margin: "0",
  };

  const linkStyle = {
    color: "#5a3fbc",
    textDecoration: "none",
  };

  return (
    <div className="footer out-footer" style={footerStyle}>
      <div className="copyright" style={copyrightStyle}>
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a
            href="http://bizglobal.tech"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            BIZGLOBAL
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
