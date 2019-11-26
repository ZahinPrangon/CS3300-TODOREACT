import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

function Header() {
  return (
    <nav className="bp3-navbar bp3-dark mb-2">
      <div style={{ margin: "0 auto" }}>
        <div className="bp3-navbar-group bp3-align-left">
          <Link
            to="/"
            className="bp3-navbar-heading"
            style={{ textDecoration: "none" }}
          >
            TODO LIST
          </Link>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Link to="/" className="bp3-button bp3-minimal bp3-icon-home">
            Home
          </Link>
          <span className="bp3-navbar-divider"></span>
          <Button
            className="bp3-button bp3-minimal bp3-icon-calendar"
            to="/calendar"
          ></Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
