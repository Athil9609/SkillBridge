import React, { useState } from 'react';
import SkillCategory from './Skills/SkillCategory';
import UserDashboard from './Dashboard/UserDashboard';
import ServiceBookings from './Bookings/ServiceBookings';
const Home = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  // Function to render the current section based on the active selection
  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <UserDashboard />;
      case 'Skills':
        return <SkillCategory />;
      case 'ServiceBookings':
        return <ServiceBookings />;
      case 'Chat':
        return <Chat />;
      default:
        return <UserDashboard />;
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

export default Home;
