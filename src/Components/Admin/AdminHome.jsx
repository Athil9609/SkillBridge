import React, { useState } from 'react';
import ManageUsers from './ManageUsers';
import ManageSkillCategories from './SkillCategroy/ManageSkillCategories';
import ViewTransactions from './ViewTransactions';
import RatingAndFeedback from './RatingAndFeedback';
import ViewComplaints from './ViewComplaints';
import SkillListings from './SkillListing/SkillListing';

const AdminHome = () => {
  const [activeSection, setActiveSection] = useState('ManageUsers');

  // Function to render the current section based on the active selection
  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <h2>Admin Dashboard</h2>; // Replace with your actual dashboard component
      case 'ManageUsers':
        return <ManageUsers />;
      case 'ManageSkillCategories':
        return <ManageSkillCategories />;
      case 'ViewTransactions':
        return <ViewTransactions />;
      case 'RatingAndFeedback':
        return <RatingAndFeedback />;
      case 'ViewComplaints':
        return <ViewComplaints />;
      case 'SkillListings':
        return <SkillListings />;
      default:
        return <h2>Admin Dashboard</h2>;
    }
  };

  return (
    <div>
      
      <div className="container mt-4">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminHome;
