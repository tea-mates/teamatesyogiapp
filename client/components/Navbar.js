import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = props => {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            <img className="nav-logo" src="/logo.png" />
          </div>
          <div id="appName">Yogi Says</div>

          <ul className="nav-links">
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
