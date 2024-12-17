import React, { useState,useRef,useEffect } from "react";
import { Bell, Settings, Wallet, Plus, Star, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";

const currencyPairs = [
  { id: 1, name: "EUR/NZD", type: "OTC", change: 0.22, profit1: 90, profit5: 90, isFavorite: false },
  { id: 2, name: "USD/COP", type: "OTC", change: -0.07, profit1: 90, profit5: 90, isFavorite: false },
  { id: 3, name: "CAD/CHF", type: "OTC", change: 5.4, profit1: 89, profit5: 90, isFavorite: false },
  { id: 4, name: "NZD/CHF", type: "OTC", change: -1.4, profit1: 89, profit5: 89, isFavorite: false },
  { id: 5, name: "USD/CAD", type: "OTC", change: 1.35, profit1: 89, profit5: 89, isFavorite: false },
  { id: 6, name: "XAU/USD", type: "OTC", change: 0.45, profit1: 88, profit5: 87, isFavorite: false },
  { id: 7, name: "GBP/USD", type: "OTC", change: -0.32, profit1: 85, profit5: 86, isFavorite: false },
  { id: 8, name: "BTC/USD", type: "CRYPTO", change: 3.25, profit1: 90, profit5: 92, isFavorite: false },
  { id: 9, name: "ETH/USD", type: "CRYPTO", change: 2.75, profit1: 89, profit5: 90, isFavorite: false },
  { id: 10, name: "AUD/USD", type: "OTC", change: 1.12, profit1: 87, profit5: 88, isFavorite: false },
];

const categories = ["ALL", "CURRENCIES", "CRYPTO", "COMMODITIES", "STOCKS"];

export default function WindowNavbar() {
  const [formData, setFormData] = useState({ image: null });
  const [pairs, setPairs] = useState(currencyPairs);
  const [selectedPair, setSelectedPair] = useState(currencyPairs[0].name);
  const [selected, setSelected] = useState("US");
  const [showCurrencyList, setShowCurrencyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      const file = files[0];
      if (name === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const toggleFavorite = (id) => {
    setPairs((prevPairs) =>
      prevPairs.map((pair) =>
        pair.id === id ? { ...pair, isFavorite: !pair.isFavorite } : pair
      )
    );
  };

  const filteredPairs = pairs.filter(
    (pair) =>
      pair.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeCategory === "ALL" || pair.type === activeCategory)
  );

    const containerRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowCurrencyList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCurrencyList]);

  return (
    <header className="navbar flex items-center justify-between bg-white text-black shadow-md p-4">
      <div className="flex items-center space-x-4">
        <div>
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          </Link>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
          {currencyPairs.map((pair) => (
            <button
              key={pair.id}
              className={`flex items-center px-2 py-1 rounded-md text-sm transition-colors ${selectedPair === pair.name
                  ? "bg-gray-300 text-black"
                  : "text-gray-500 hover:bg-gray-200 hover:text-black"
                }`}
              onClick={() => setSelectedPair(pair.name)}
            >
              {pair.name}
            </button>
          ))}
          <button
            className="p-1 text-gray-500 hover:bg-gray-200 hover:text-black rounded-md transition-colors"
            aria-label="Add new pair"
            onClick={() => setShowCurrencyList(!showCurrencyList)}
          >
            <Plus size={16} />
          </button>

          <div>
      <div>
        <button onClick={() => setShowCurrencyList(!showCurrencyList)}>
          
        </button>
      </div>
      {showCurrencyList && (
        <div
          ref={containerRef}
          className="absolute top-12 left-0 w-full max-w-lg bg-white border rounded-md shadow-lg z-10 p-6"
        >
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search pairs"
              className="w-full bg-gray-100 text-black pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-black"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredPairs.map((pair) => (
              <div
                key={pair.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded hover:bg-gray-200"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(pair.id)}
                    className={`${
                      pair.isFavorite ? "text-yellow-400" : "text-gray-600"
                    } hover:text-yellow-400`}
                  >
                    <Star
                      size={16}
                      fill={pair.isFavorite ? "currentColor" : "none"}
                    />
                  </button>
                  <span>{pair.name}</span>
                </div>
                <div className="text-sm">
                  {pair.change > 0 ? "+" : ""}
                  {pair.change}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ReactFlagsSelect
          selected={selected}
          onSelect={(code) => setSelected(code)}
          className="bg-gray-100 text-black rounded-md"
        />
        <div className="flex items-center bg-gray-100 p-2 rounded-md space-x-2">
          <Wallet size={16} />
          <div>
            <p className="text-sm font-semibold">$0.00</p>
            <p className="text-xs text-gray-500">Demo Account</p>
          </div>
        </div>
        <Link to="/settings/profile-manage">
          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Settings size={16} />
          </button>
        </Link>
        <button
          className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => alert("Notifications clicked")}
        >
          <Bell size={16} />
        </button>
        <label htmlFor="image" className="relative cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-gray-300 overflow-hidden">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150/000000/FFFFFF/?text=Profile"
                alt="Default Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>
    </header>
  );
}
