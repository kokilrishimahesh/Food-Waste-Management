import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MonitorPlay, MessageSquare, Settings, UserRound, Book, Eye } from 'lucide-react';

import '../../../Components/Sidebar.css';

const NGO_Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="" className="sidebar-link">
            <Home className="sidebar-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="donation" className="sidebar-link">
            <Eye className="sidebar-icon" />
            Track Donation Status
          </Link>
        </li>
        {/* New button for Donation list */}
        <li>
          <Link to="donationlist" className="sidebar-link">
            <MonitorPlay className="sidebar-icon" />
            Donation List
          </Link>
        </li>
        {/* New button for Blogs */}
        <li>
          <Link to="blog" className="sidebar-link">
            <Book className="sidebar-icon" />
            Blogs
          </Link>
        </li>
        <hr />
        <li>
          <Link to="profile" className="sidebar-link">
            <UserRound className="sidebar-icon" />
            Profile
          </Link>
        </li>
        <li>
          <Link to="settings" className="sidebar-link">
            <Settings className="sidebar-icon" />
            Settings
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default NGO_Sidebar;
