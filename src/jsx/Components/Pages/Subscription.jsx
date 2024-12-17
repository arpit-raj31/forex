import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import {Link} from "react-router-dom"
const subscriptions = [
  {
    id: "standard",
    title: "Standard",
    tag: "Recommended",
    tagColor: "#362465",
    description: "Most popular! A great account for all types of traders.",
    details: [
      { label: "Minimum deposit", value: "10 USD" },
      { label: "Spread", value: "From 0.20" },
      { label: "Commission", value: "No commission" },
    ],
    borderColor: "#d1d5db",
  },
  {
    id: "pro",
    title: "Pro",
    tag: "Instant or market execution",
    tagColor: "#22c55e", // Green
    description:
      "Zero commission and low spreads with both instant or market execution.",
    details: [
      { label: "Minimum deposit", value: "500 USD" },
      { label: "Spread", value: "From 0.10" },
      { label: "Commission", value: "No commission" },
    ],
    borderColor: "#d1d5db", // Gray
  },
  {
    id: "raw-spread",
    title: "Raw Spread",
    tag: "Professional",
    tagColor: "#d1d5db", // Gray
    description: "Low raw spreads and a low fixed commission.",
    details: [
      { label: "Minimum deposit", value: "500 USD" },
      { label: "Spread", value: "From 0.00" },
      { label: "Commission", value: "To 3.50 USD" },
    ],
    borderColor: "#d1d5db", // Gray
  },
  {
    id: "zero",
    title: "Zero",
    tag: "Professional",
    tagColor: "#d1d5db", // Gray
    description: "Get 0 spreads for 95% of the day on 30 pairs.",
    details: [
      { label: "Minimum deposit", value: "" },
      { label: "Spread", value: "Best" },
      { label: "Commission", value: "From" },
    ],
    borderColor: "#d1d5db", // Gray
  },
  {
    id: "standard-cent",
    title: "Standard Cent",
    tag: "Basic",
    tagColor: "#d1d5db", // Gray
    description: "Get 0 spreads for 95% of the day on 30 pairs.",
    details: [
      { label: "Minimum deposit", value: "" },
      { label: "Spread", value: "Best" },
      { label: "Commission", value: "From" },
    ],
    borderColor: "#d1d5db", // Gray
  },
];

const Subscription = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const scrollToPackage = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center"});
  };

  const handleSelectPackage = (subscription) => {
    setSelectedPackage(subscription);
  };

  const handleContinue = () => {
    if (selectedPackage) {
      alert(`Proceeding to create an account for ${selectedPackage.title}`);
    } else {
      alert("Please select a package first.");
    }
  };

  return (
   <div style={{height:"100vh"}}>
     <div className="relative w-full">

<h1  className="text-[#362465] text-3xl font-bold text-center mb-6 mt-12">Open New Account</h1>
<div className="flex space-x-4 overflow-x-auto scrollbar-hide p-4">
{subscriptions.map((subscription, index) => (
  <div
    id={subscription.id}
    key={index}
    className={`subscription-card min-w-[300px] max-w-[300px] p-4 rounded-lg border-2 shadow-md flex-shrink-0 transition-transform transform hover:scale-105 cursor-pointer ${
      selectedPackage?.id === subscription.id ? "border-[#362465]" : "border-gray-300"
    }`}
    style={{ borderColor: selectedPackage?.id === subscription.id ? "#362465" : subscription.borderColor }}
    onClick={() => handleSelectPackage(subscription)}
  >
    <div
      className="recommended-tag text-white text-sm rounded-md px-2 py-1 inline-block"
      style={{ backgroundColor: subscription.tagColor }}
    >
      {subscription.tag}
    </div>
    <h2 className="text-[#362465] text-xl font-bold mt-2">
      {subscription.title}
    </h2>
    <p className="text-gray-600 text-sm mt-2">
      {subscription.description}
    </p>
    <div className="details mt-4">
      {subscription.details.map((detail, idx) => (
        <p className="text-gray-700" key={idx}>
          {detail.label}: <span className="text-black font-semibold">{detail.value}</span>
        </p>
      ))}
    </div>
  </div>
))}
</div>

<div className="flex justify-center mt-6">
<Link to="/new-account">
<button
  onClick={handleContinue}
  className="bg-[#362465] text-white py-2 px-6 rounded-lg hover:bg-[#2a1b58] transition"
>
  Continue to Create Account
</button></Link>
</div>
</div>
   </div>
  );
};

export default Subscription;
