import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const UserManagement = () => {
  return (
      <Sidebar>
          <Navbar/>
      <div className="m-4">
        <h1>User Management</h1>
      </div>
    </Sidebar>
  );
};

export default UserManagement;
