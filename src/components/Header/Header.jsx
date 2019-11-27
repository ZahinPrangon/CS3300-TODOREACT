import React from "react";

import AddTodo from "../Add-Todo/Add-Todo";
import Alert from "../Alert/Alert";

import { format } from "date-fns";
import Clock from "react-live-clock";
import { Button, Popover, Classes } from "@blueprintjs/core";

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
            style={{ textDecoration: "none", fontWeight: "900" }}
          >
            TODO LIST
          </span>
          <span
            className=""
            style={{ textDecoration: "none", paddingLeft: "5px" }}
          >
            {format(new Date(), "'Today is' MM/dd/yyyy iiii")}
            <Clock
              style={{ paddingLeft: "5px" }}
              format={"HH:mm:ss"}
              ticking={true}
            />
          </span>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Button
            onClick={props.onChangeHome}
            className="bp3-button bp3-minimal bp3-icon-home"
          >
            Home
          </Button>
          <span className="bp3-navbar-divider"></span>
          <Button
            onClick={props.onChangeView}
            className="bp3-button bp3-minimal bp3-icon-calendar"
          ></Button>
          <Alert alert={alert} />
          <AddTodo addTodo={props.addTodo} setAlert={props.setAlert} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
