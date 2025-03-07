import React, { useState } from "react";
import MyBookings from "./MyBookings";
import ServiceBookings from "./ServiceBookings";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("myBookings");

  const tabs = [
    { id: "myBookings", label: "My Bookings" },
    { id: "serviceBookings", label: "User Bookings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "myBookings":
        return <MyBookings />;
      case "serviceBookings":
        return <ServiceBookings />;
      default:
        return <MyBookings />;
    }
  };

  return (
    <div className="container my-5 ">
      <div className="d-flex flex-wrap justify-content-center align-items-center mb-3 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn me-2 mb-2 ${activeTab === tab.id ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ minWidth: '150px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="border p-4 rounded">{renderContent()}</div>
    </div>
  );
};

export default Bookings;
