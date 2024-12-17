import React, { useState } from "react";

const CreateUserModal = ({ setCreateUserForm, createUser }) => {
  const [newUserData, setNewUserData] = useState({
    name: "",
    accountId: "",
    email: "",
    password: "",
  });     

  // Handle input change
  const handleCreateUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleCreateUserSubmit = (e) => {
    e.preventDefault();

    // Call the function to create a user (you might want to send it to an API or backend)
    createUser(newUserData);

    // Close the modal
    setCreateUserForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-11/12 p-5 relative grid grid-cols-2 gap-5 animate-fade-in">
        <span
          className="absolute top-4 right-4 text-2xl font-bold text-gray-400 cursor-pointer transition-colors duration-300 hover:text-red-600"
          onClick={() => setCreateUserForm(false)} // Close the form
        >
          &times;
        </span>

        <h2 className="col-span-2 text-center text-lg font-bold text-gray-800 mb-5">
          Create User
        </h2>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-600">Name:</label>
          <input
            type="text"
            name="name"
            value={newUserData.name}
            onChange={handleCreateUserChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Account ID */}
        <div>
          <label className="block mb-1 font-semibold text-gray-600">Account ID:</label>
          <input
            type="text"
            name="accountId"
            value={newUserData.accountId}
            onChange={handleCreateUserChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={newUserData.email}
            onChange={handleCreateUserChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-semibold text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleCreateUserChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-5">
          <button
            type="submit"
            onClick={handleCreateUserSubmit}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
