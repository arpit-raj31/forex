import React from "react";

const AdminFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#fff] p-4">
      <div className="mx-auto rounded-t-3xl bg-white px-6 py-4 text-center text-sm text-gray-600 ml-[16rem]">
        Copyright © Designed & Developed by{" "}
        <span className="text-[#2D1B69]">BIZGLOBAL</span> {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default AdminFooter;
