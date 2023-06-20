import React from "react";
import customer from "../../assets/icons/admins.png";
import "./Dashboard.css";

const DashboardCard = ({ dash }) => {
  const { count, icon, name,background } = dash;
  return (
    <div className="col-md-3">
      <div style={{backgroundColor: background}} className="d-flex justify-content-between w-100 dash-card">
        <div className="d-flex align-items-end">
          <div className="">
            <h4>{count}</h4>
            <h6>{name}</h6>
          </div>
        </div>
        <div>
          <div>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
