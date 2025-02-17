import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons
import "./LandingPage.css"; // Make sure you import the CSS

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Replace with real user data if available
  const user = {
    name: "John Doe",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="landing-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-icon" onClick={toggleDropdown}>
          <FaUserCircle size={40} color="#fff" />
        </div>
        {isDropdownOpen && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-content">
              <Link to="/profile" className="dropdown-link">Profile</Link>
              <Link to="/settings" className="dropdown-link">Settings</Link>
              <Link to="/" className="dropdown-link">Logout</Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="landing-content">
        <h1 className="landing-title">💪 FLEX-IT-OUT</h1>
        <p className="landing-subtitle">
          Your AI-powered fitness companion for tracking workouts and smashing
          goals!
        </p>

        <div className="flex justify-center space-x-4">
          {/* <Link to="/signup"> */}
            <button className="cta-button">Get Started</button>
          {/* </Link> hide this for some tiem */}
          <a href="#features" className="learn-more-btn">
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features">
        <Link to="/pushup">
          <div className="feature-card">
            <h3>🏋️ Push-up Counter</h3>
            <p>Real-time push-up tracking with AI.</p>
          </div>
        </Link>
        <Link to="/situps">
          <div className="feature-card">
            <h3>🏃 Sit-up Tracker</h3>
            <p>Posture-correct sit-up counting.</p>
          </div>
        </Link>
        <Link to="/leaderboards">
          <div className="feature-card">
            <h3>🔥 Leaderboards</h3>
            <p>Challenge friends & climb the ranks.</p>
          </div>
        </Link>
      </div>

      {/* Footer Section */}
      {/* <footer className="footer">
        <p>&copy; 2023 FLEX-IT-OUT. All rights reserved.</p>
        <div className="social-media">
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">Instagram</a>
        </div>
      </footer> */}
    </div>
  );
}
