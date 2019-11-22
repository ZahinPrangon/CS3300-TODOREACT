import React from "react";
import Moment from "react-moment";

function TodoItem(props) {
  // Completed Styles
  const completedStyle = {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
  };

  // Button Styles
  const btnStyle = {
    background: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  };

  return (
    <div className="todo-item ml-2">
      <hr />
      <input
        type="checkbox"
        checked={props.item.completed}
        onChange={() => props.handleChange(props.item.id)}
      />

      <div style={props.item.completed ? completedStyle : null}>
        <h3>{props.item.text}</h3>
        <Moment format="MMMM Do YYYY dddd HH:mm">{props.item.date}</Moment>
        <h4>Importance Level: {props.item.urgentLevel}</h4>
      </div>
      <button
        onClick={props.deleteTodo.bind(this, props.item.id)}
        style={btnStyle}
      >
        DELETE
      </button>
    </div>
  );
}

export default TodoItem;
