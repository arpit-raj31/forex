import React, { useState } from "react";

const AddUserModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [file, setFile] = useState(null); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      console.log("File uploaded:", file);
      // Perform file upload or processing logic here
    } else {
      alert("Please upload a file before submitting.");
    }
    setIsModalVisible(false); // Close the modal after submission
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalVisible(true)}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add User
      </button>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-1 gap-5 animate-fade-in">
            {/* Close Button */}
            <span
              className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
              onClick={() => setIsModalVisible(false)}
            >
              &times;
            </span>

            {/* Modal Title */}
            <h2 className="text-center text-lg font-bold text-gray-800 mb-5">
              Add User
            </h2>

            {/* File Upload */}
            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Upload CSV/PDF:
              </label>
              <input
                type="file"
                name="bulkFile"
                accept=".csv, .pdf"
                onChange={handleFileChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserModal;
