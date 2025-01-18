import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MonitorPlay, MessageSquare, Settings, UserRound, Book, Eye, LogOutIcon } from 'lucide-react';

import '../../../Components/Sidebar.css';

const NGO_Sidebar = () => {
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
          <Link to="trackDonations" className="sidebar-link">
            <Eye className="sidebar-icon" />
            Track Donation Status
          </Link>
        </li>
        {/* New button for Donation list */}
        <li>
          <Link to="donationlist" className="sidebar-link">
            <MonitorPlay className="sidebar-icon" />
            Check Available Donations
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
          <div
            to="login"
            className="sidebar-link"
            onClick={handleLogout}
          >
            <LogOutIcon className="sidebar-icon" />
            LogOut
          </div>
        </li>

      </ul>
    </div>
  );
};

export default NGO_Sidebar;
