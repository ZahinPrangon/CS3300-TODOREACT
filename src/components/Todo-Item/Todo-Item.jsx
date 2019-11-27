import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { H2, Divider, Checkbox, Button, Card, Tag } from "@blueprintjs/core";

function TodoItem(props) {
  // Completed Styles
  const completedStyle = {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
  };

  // Button Styles
  const btnStyle = {
    width: "10%",
    cursor: "pointer"
  };

  const cardStyle = {
    backgroundColor: "",
    marginBottom: "5px"
  };
  const ms = moment(props.item.end, "DD/MM/YYYY HH:mm:ss").diff(
    moment(props.item.start, "DD/MM/YYYY HH:mm:ss")
  );
  const d = moment.duration(ms);
  const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

  return (
    <Card interactive style={cardStyle}>
      <div style={props.item.completed ? completedStyle : null}>
        <Checkbox
          large
          type="checkbox"
          className="text-center"
          checked={props.item.completed}
          onChange={() => props.handleChange(props.item.id)}
        />
        <Tag large className="text-right">
          {props.item.type}
        </Tag>
        <H2 className="text-center">{props.item.title}</H2>
        <div className="text-center">
          <div>
            <span className="mr-1">From</span>
            <Moment className="mr-1" format="hh : mm a">
              {props.item.start}
            </Moment>
            <Moment format="MMMM Do YYYY dddd">{props.item.start}</Moment>
          </div>
          <Divider />
          <span className="mr-1">To</span>
          <Moment className="mr-1" format="hh : mm a">
            {props.item.end}
          </Moment>
          <Moment format="MMMM Do YYYY dddd">{props.item.end}</Moment>
          <p className="text-muted">Time required: {s}</p>
          <Divider />
        </div>
        <p className="text-center">
          Importance Level: {props.item.urgentLevel}
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "5px" }}
      >
        <Button
          large
          style={btnStyle}
          type="button"
          className="btn btn-primary"
          icon="trash"
          onClick={props.deleteTodo.bind(this, props.item.id)}
        ></Button>
      </div>
    </Card>
  );
}

export default TodoItem;
