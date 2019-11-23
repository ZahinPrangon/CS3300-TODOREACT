import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bp3-navbar bp3-dark">
      <div style={{ margin: "0 auto" }}>
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">TODO LIST</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Link to="/" className="bp3-button bp3-minimal bp3-icon-home">
            Home
          </Link>
          <span className="bp3-navbar-divider"></span>
          <Link
            className="bp3-button bp3-minimal bp3-icon-calendar"
            to="/calendar"
          ></Link>
          <button
            to="/notifications"
            className="bp3-button bp3-minimal bp3-icon-notifications"
          ></button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
