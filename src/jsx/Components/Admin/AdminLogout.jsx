import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../Store/Store';

const AdminLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/adminlogin');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-[#F5F3FF] hover:bg-[rgb(41,23,87)] hover:text-white text-black p-3 rounded-md transition-colors duration-300"
    >
      Logout
    </button>
  );
};

export default AdminLogout;
