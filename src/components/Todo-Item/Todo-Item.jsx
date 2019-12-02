import React from "react";
import Moment from "react-moment";
import { differenceInMinutes, differenceInCalendarDays } from "date-fns";
import { H2, Divider, Checkbox, Button, Card, Tag } from "@blueprintjs/core";
import StarRatingComponent from "react-star-rating-component";

function TodoItem(props) {
  // Completed Styles
  const completedStyle = {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
  };

  const cardStyle = {
    marginBottom: "15px",
    width: "100%",
    display: "inline-block",
    marginRight: "15px",
    justifyContent: "center"
  };

  let hours = differenceInMinutes(props.item.end, props.item.start) / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);

  return (
    <Card className="text-center" interactive style={cardStyle}>
      <div style={props.item.completed ? completedStyle : null}>
        <div
          className="d-flex justify-content-end text-muted"
          style={{ flexDirection: "column" }}
        >
          <div className="text-right">
            {differenceInCalendarDays(props.item.end, props.item.start) > 0
              ? "Ends in " +
                differenceInCalendarDays(props.item.end, props.item.start) +
                " day"
              : "Todo ends today"}
          </div>
        </div>
        <Checkbox
          large
          type="checkbox"
          className="text-center"
          checked={props.item.completed}
          onChange={() => props.handleChange(props.item.id)}
        />
        <H2 className="text-center">{props.item.title}</H2>
        <span>
          <Tag large round active className="p-2">
            {props.item.type}
          </Tag>
        </span>
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
          <p className="text-muted">
            <b>Time required:</b> {rhours} <b>hr</b> {rminutes} <b>min</b>
          </p>
          <Divider />
          <p className="text-center font-italic">Importance Level</p>
          <StarRatingComponent
            name="Importance Level"
            className="text-center"
            editing={false}
            value={props.item.rating}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "5px" }}
      >
        <Button
          large
          minimal
          // style={btnStyle}
          type="button"
          className="bp3-intent-warning"
          icon="trash"
          onClick={props.deleteTodo.bind(this, props.item.id)}
        ></Button>
      </div>
    </Card>
  );
}

export default TodoItem;
