import React, { useState } from "react";
import PostSkill from "./PostSkill";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";
import UserTransactions from "./UserTransactions";
import "../user.css";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  const tabs = [
    { id: "portfolio", label: "View Portfolio" },
    { id: "postSkill", label: "Post Skill" },
    { id: "reviews", label: "Reviews" },
    { id: "transaction", label: "Transaction" },
  ];

  return (
    <div className="user-dashboard dashboard-container">
      <div className="tabs tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button btn-custom ${
              activeTab === tab.id ? "active btn-selected" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="content-box content-area">
        {activeTab === "portfolio" && <Portfolio />}
        {activeTab === "postSkill" && <PostSkill />}
        {activeTab === "reviews" && <Reviews />}
        {activeTab === "transaction" && <UserTransactions />}
      </div>
    </div>
  );
};

export default UserDashboard;
