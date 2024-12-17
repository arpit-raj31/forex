import React, { useState } from "react";
import { useNavigate } from "react-router";

const Footer = () => {
  const d = new Date();
  const [hoveredLink, setHoveredLink] = useState(null);
 const navigate=useNavigate();
  const styles = {
    footerContainer: {
      backgroundColor: "#dee2e6",
      color: "#000",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
    },
    footerTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    textContent: {
      flex: "1",
      marginRight: "20px",
    },
    footerLinks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
      minWidth: "200px",
    },
    paragraph: {
      marginBottom: "10px",
      lineHeight: "1.6",
    },
    link: (isHovered) => ({
      color: "#5a3fbc",
      textDecoration: isHovered ? "underline" : "none",
      cursor: "pointer",
    }),
    footerCopyright: {
      borderTop: "1px solid #5a3fbc",
      paddingTop: "10px",
      textAlign: "center",
    },
    copyrightStyle: {
      fontSize: "14px",
      margin: "0",
    },
  };

  return (
    <footer style={styles.footerContainer}>
      {/* Top Section: Text Content on Left and Links on Right */}
      <div style={styles.footerTop}>
        {/* Text Content */}
        <div style={styles.textContent}>
          <p style={styles.paragraph}>
            CrownForex is a Securities Dealer registered in Seychelles with registration number 8423606-1 and authorised by the Financial Services Authority (FSA) with licence number SD025. The registered office of CrownForex LTD is at 9A CT House, 2nd floor, Providence, Mahe, Seychelles.
          </p>
          <p style={styles.paragraph}>
            The information on this website may only be copied with the express written permission of CrownForex. General Risk Warning: CFDs are leveraged products. Trading in CFDs carries a high level of risk thus may not be appropriate for all investors. The investment value can both increase and decrease and the investors may lose all their invested capital. Under no circumstances shall the Company have any liability to any person or entity for any loss or damage in whole or part caused by, resulting from, or relating to any transactions related to CFDs.{" "}
            <a
              onClick={() => navigate("/risk-disclosure")}
              style={styles.link(hoveredLink === "learn-more")}
              onMouseEnter={() => setHoveredLink("learn-more")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Learn more
            </a>
          </p>
          <p style={styles.paragraph}>
            CorwnForex complies with the Payment Card Industry Data Security Standard (PCI DSS) to ensure your security and privacy. We conduct regular vulnerability scans and penetration tests in accordance with the PCI DSS requirements for our business model.
          </p>
        </div>

        {/* Links */}
        <div style={styles.footerLinks}>
        <a
  onClick={() => {
    navigate("/privacy-agreement");
    window.scrollTo(0, 0); // Scroll to top
  }}
  style={styles.link(hoveredLink === "privacy-agreement")}
  onMouseEnter={() => setHoveredLink("privacy-agreement")}
  onMouseLeave={() => setHoveredLink(null)}
>
  Privacy Agreement
</a>
          <a
              onClick={() => {navigate("/risk-disclosure") 
                window.scrollTo(0, 0); 
              }}
            style={styles.link(hoveredLink === "risk-disclosure")}
            onMouseEnter={() => setHoveredLink("risk-disclosure")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Risk Disclosure
          </a>
          <a
            onClick={() => {navigate("/preventing-money-launderings")
              window.scrollTo(0, 0); 
            }}
  
            style={styles.link(hoveredLink === "preventing-money-laundering")}
            onMouseEnter={() => setHoveredLink("preventing-money-laundering")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Preventing Money Laundering
          </a>
          {/* <a
            href="#security-instructions"
            style={styles.link(hoveredLink === "security-instructions")}
            onMouseEnter={() => setHoveredLink("security-instructions")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Security Instructions
          </a>
          <a
            href="#legal-documents"
            style={styles.link(hoveredLink === "legal-documents")}
            onMouseEnter={() => setHoveredLink("legal-documents")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Legal Documents
          </a>
          <a
            href="#complaints-handling-policy"
            style={styles.link(hoveredLink === "complaints-handling-policy")}
            onMouseEnter={() => setHoveredLink("complaints-handling-policy")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Complaints Handling Policy
          </a> */}
          <a
            href="#contact"
            style={styles.link(hoveredLink === "contact")}
            onMouseEnter={() => setHoveredLink("contact")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={styles.footerCopyright}>
        <p style={styles.copyrightStyle}>
          Copyright © Designed &amp; Developed by{" "}
          <a
            href="http://bizglobal.tech"
            target="_blank"
            rel="noreferrer"
            style={styles.link(hoveredLink === "bizglobal")}
            onMouseEnter={() => setHoveredLink("bizglobal")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            BIZGLOBAL
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
