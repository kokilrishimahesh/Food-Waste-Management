import React from 'react';
import { Link } from 'react-router-dom';
import { RiDashboard2Fill, RiUserFill, RiDonutChartFill, RiMessage2Fill, RiSettings2Fill, RiCheckboxCircleFill } from 'react-icons/ri'; // Updated import with correct icon

import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="dashboard" className="sidebar-link">
            <RiDashboard2Fill className="sidebar-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="donation" className="sidebar-link">
            <RiDonutChartFill className="sidebar-icon" />
            Donation
          </Link>
        </li>
        {/* New button for Donation list */}
        <li>
          <Link to="donationlist" className="sidebar-link">
            <RiCheckboxCircleFill className="sidebar-icon" />
            Donation List
          </Link>
        </li>
        <li>
          <Link to="Edu" className="sidebar-link">
            <RiMessage2Fill className="sidebar-icon" />
            Edu
          </Link>
        </li>
        <li>
          <Link to="profile" className="sidebar-link">
            <RiUserFill className="sidebar-icon" />
            Profile
          </Link>
        </li>

        <li>
          <Link to="settings" className="sidebar-link">
            <RiSettings2Fill className="sidebar-icon" />
            Settings
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
