import React from "react";
import { Divider, Callout } from "@blueprintjs/core";
import { format } from "date-fns";
import StarRatingComponent from "react-star-rating-component";

export const Summary = props => {
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;

  for (let i = 0; i < props.todos.length; i++) {
    if (props.todos[i].rating === 1) {
      one++;
    } else if (props.todos[i].rating === 2) {
      two++;
    } else if (props.todos[i].rating === 3) {
      three++;
    } else if (props.todos[i].rating === 4) {
      four++;
    } else if (props.todos[i].rating === 5) {
      five++;
    }
  }
  let i = 1;
  const todo = props.todos.map(todo => (
    <tr>
      <th scope="row">{i++}</th>
      <td>{todo.title}</td>
      <td>{format(todo.start, "PPPP")}</td>
      <td>{format(todo.end, "PPPP")}</td>
      <td>{todo.type}</td>
      <td>{todo.completed.toString()}</td>
    </tr>
  ));

  return (
    <div>
      {props.todos.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Todo Number</th>
              <th scope="col">Title</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Type</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          <tbody>{todo}</tbody>
        </table>
      ) : (
        <div></div>
      )}
      <div className="row">
        <ul className="list-group w-50 pr-1 col-md">
          <Callout title="Urgent" className="pb-1" />
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <StarRatingComponent name="rate1" starCount={5} value={1} />{" "}
            <Divider />
            <span className="badge badge-primary badge-pill">{one}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <StarRatingComponent name="rate2" starCount={5} value={2} />{" "}
            <Divider />
            <span className="badge badge-primary badge-pill">{two}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <StarRatingComponent name="rate3" starCount={5} value={3} />{" "}
            <Divider />
            <span className="badge badge-primary badge-pill">{three}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <StarRatingComponent name="rate4" starCount={5} value={4} />{" "}
            <Divider />
            <span className="badge badge-primary badge-pill">{four}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <StarRatingComponent name="rate5" starCount={5} value={5} />{" "}
            <Divider />
            <span className="badge badge-primary badge-pill">{five}</span>
          </li>
        </ul>

        <ul className="list-group col-md mb-2">
          <Callout title="Status" className="pb-1" />
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Completed
            <Divider />
            <span className="badge badge-primary badge-pill">
              {props.todos.filter(todo => todo.completed === true).length}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Not Completed
            <Divider />
            <span className="badge badge-primary badge-pill">
              {props.todos.filter(todo => todo.completed === false).length}
            </span>
          </li>
        </ul>
        <ul className="list-group w-50 col-md">
          <Callout title="Type" className="pb-1" />
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Work:
            <Divider />
            <span className="badge badge-primary badge-pill">
              {props.todos.filter(todo => todo.type === "work").length}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Personal:
            <Divider />
            <span className="badge badge-primary badge-pill">
              {props.todos.filter(todo => todo.type === "personal").length}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
