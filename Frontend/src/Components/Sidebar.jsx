import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Donut, MonitorPlay, MessageSquare, Settings, UserRound, Book, LogOutIcon } from 'lucide-react'; // Updated import with Lucid icons

import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('Userid');
    localStorage.removeItem('role');
    navigate("/login")
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="donation" className="sidebar-link">
            <Donut className="sidebar-icon" />
            Donation
          </Link>
        </li>
        {/* New button for Donation list */}
        <li>
          <Link to="donationlist" className="sidebar-link">
            <MonitorPlay className="sidebar-icon" />
            Donation List
          </Link>
        </li>
        <li>
          <Link to="Edu" className="sidebar-link">
            <MessageSquare className="sidebar-icon" />
            Videos
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
        <li>
          <div className="sidebar-link" onClick={handleLogout}>
            <LogOutIcon className="sidebar-icon" />
            Log Out
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
