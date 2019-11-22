import React from "react";

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
    <div>
      <ul>
        <li>Urgent Level 1: {one}</li>
        <li>Urgent Level 2: {two}</li>
        <li>Urgent Level 3: {three}</li>
        <li>Urgent Level 4: {four}</li>
        <li>Urgent Level 5: {five}</li>
      </ul>
    </div>
  );
};
