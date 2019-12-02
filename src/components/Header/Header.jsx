import React from "react";

import AddTodo from "../Add-Todo/Add-Todo";
import Alert from "../Alert/Alert";
import Dropdown from "../Dropdown/Dropdown";

// import { format } from "date-fns";
// import Clock from "react-live-clock";
import { Button } from "@blueprintjs/core";

function Header(props) {
  return (
    <nav
      className="bp3-navbar bp3-dark mb-2"
      style={{ position: "fixed", top: "0" }}
    >
      <div style={{ margin: "0 auto" }}>
        <div className="bp3-navbar-group bp3-align-left">
          <span
            className="bp3-navbar-heading"
            style={{
              textDecoration: "none",
              fontWeight: "900",
              cursor: "pointer"
            }}
            onClick={props.onChangeHome}
          >
            TODO LIST
          </span>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Button
            onClick={props.onChangeHome}
            className="bp3-button bp3-minimal bp3-icon-home"
          ></Button>
          <span className="bp3-navbar-divider"></span>
          <Alert alert={alert} />
          <AddTodo addTodo={props.addTodo} setAlert={props.setAlert} />
          <Button
            onClick={props.onChangeView}
            className="bp3-button bp3-minimal bp3-icon-calendar"
          ></Button>
          <Dropdown todos={props.todos} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
