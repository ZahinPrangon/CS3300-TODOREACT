import React from "react";
import { Divider } from "@blueprintjs/core";

export const Summary = props => {
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;

  for (let i = 0; i < props.todos.length; i++) {
    if (props.todos[i].urgentLevel === "one") {
      one++;
    } else if (props.todos[i].urgentLevel === "two") {
      two++;
    } else if (props.todos[i].urgentLevel === "three") {
      three++;
    } else if (props.todos[i].urgentLevel === "four") {
      four++;
    } else if (props.todos[i].urgentLevel === "five") {
      five++;
    }
  }

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Urgent Level 1:
        <Divider />
        <span className="badge badge-primary badge-pill">{one}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Urgent Level 2:
        <Divider />
        <span className="badge badge-primary badge-pill">{two}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Urgent Level 3:
        <Divider />
        <span className="badge badge-primary badge-pill">{three}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Urgent Level 4:
        <Divider />
        <span className="badge badge-primary badge-pill">{four}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Urgent Level 5:
        <Divider />
        <span className="badge badge-primary badge-pill">{five}</span>
      </li>
    </ul>
  );
};
