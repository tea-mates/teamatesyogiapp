import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = props => {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            <img
              className="nav-logo"
              src="https://www.freefavicon.com/freefavicons/abstract/rainbow-lotus-flower-silhouette-no-background-152-246078.png"
            />
          </div>
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
