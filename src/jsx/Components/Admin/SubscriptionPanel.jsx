import React, { useState } from "react";

const SubscriptionPanel = () => {
  const cardData = [
    {
      planName: "Standard",
      description: "Most popular! A great account for all types of traders.",
      minimumDeposit: "10 USD",
      spread: "From 0.20",
      commission: "No commission",
      recommended: true,
    },
    {
      planName: "Pro",
      description:
        "Designed for advanced traders looking for higher flexibility.",
      minimumDeposit: "500 USD",
      spread: "From 0.10",
      commission: "No commission",
      instant: true,
    },
    {
      planName: "Raw Spread",
      description: "Low raw spreads and a low fixed commission",
      minimumDeposit: "500 USD",
      spread: "From 0.00",
      commission: "To 3.50 USD",
      professional: true,
    },
    {
      planName: "Zero",
      description: "Get 0 spreads for 95% of the trading day on 30 pairs",
      minimumDeposit: "500 USD",
      spread: "From 0.00",
      commission: "From 0.05 USD",
      professional: true,
    },
    {
      planName: "Standard Cent",
      description: "Get 0 spreads for 95% of the trading day on 30 pairs",
      minimumDeposit: "10 USD",
      spread: "From 0.30",
      commission: "No commission",
      basic: true,
    },
  ];

  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    duration: "",
    description: "",
  });

  const handleCardSelect = (card) => {
    setFormData({
      planName: card.planName,
      price: card.minimumDeposit, // Customize the price field as needed
      duration: "",
      description: card.description,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      {/* Cards Section with Slider */}
      <div className="relative w-full max-w-6xl mb-12">
        <div className="flex space-x-6 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-4 px-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-80 rounded-lg border-2 border-yellow-400 bg-white p-6 shadow-md"
            >
              {/* Card Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{card.planName}</h3>
                  {card.recommended && (
                    <div className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  {card.instant && (
                    <div className="inline-block rounded-full bg-green-400 px-3 py-1 text-sm font-medium">
                      Instant or Market execution
                    </div>
                  )}
                  {card.professional && (
                    <div className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">
                      Professional
                    </div>
                  )}
                  {card.basic && (
                    <div className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">
                     Basic
                    </div>
                  )}
                  <p className="text-gray-600">{card.description}</p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Minimum deposit</span>
                    <span className="font-medium">{card.minimumDeposit}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Spread</span>
                    <span className="font-medium">{card.spread}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Commission</span>
                    <span className="font-medium">{card.commission}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCardSelect(card)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Create Subscription Plan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="planName"
              className="block text-sm font-medium text-gray-600"
            >
              Plan Name
            </label>
            <input
              type="text"
              id="planName"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              placeholder="Enter plan name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-600"
            >
              Duration (months)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter duration"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPanel;
