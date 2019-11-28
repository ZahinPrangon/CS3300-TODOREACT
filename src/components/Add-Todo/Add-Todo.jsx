import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Classes, Switch, Dialog } from "@blueprintjs/core";
import StarRatingComponent from "react-star-rating-component";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class AddTodo extends React.Component {
  // Component state to get the title from the input
  state = {
    title: "",
    startDate: new Date(),
    endDate: "",
    rating: 1,
    type: "work",
    isOpen: false
  };

  onChangeStartDate = date => {
    this.setState({ startDate: date });
  };

  onChangeEndDate = date => {
    this.setState({ endDate: date });
  };

  // Takes the input state from the event's target value
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onChangeUrgent = event => {
  //   this.setState({ urgentLevel: event.target.value });
  // };

  onChangeType = event => {
    this.setState({ type: event.target.value });
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  // EventListener on submit of form
  onSubmit = e => {
    // Prevents from automatically submitting the form on load
    e.preventDefault();
    // if nothing is entered in the title box
    if (this.state.title === "") {
      NotificationManager.warning("Please enter a title");
    } else if (this.state.startDate === "") {
      NotificationManager.warning("Please enter a start date and time");
    } else if (this.state.endDate === "") {
      NotificationManager.warning("Please enter a end date and time");
    } else {
      // Adding addTodo function as prop and passing the state's title as param
      this.props.addTodo(
        this.state.title,
        this.state.startDate,
        this.state.endDate,
        this.state.rating,
        this.state.type
      );
      NotificationManager.success("TODO ADDED", this.state.title);
      // Changing the state to an empty string
      this.setState({
        title: "",
        startDate: "",
        endDate: "",
        rating: 1,
        type: "work"
      });
    }
  };

  render() {
    // const today = new Date();
    const { title, startDate, endDate, type, rating } = this.state;
    return (
      <div>
        <div {...this.props}>
          <Button
            className="bp3-button bp3-minimal bp3-icon-add"
            onClick={this.handleOpen}
          />

          <Dialog onClose={this.handleClose} {...this.state}>
            <div className={Classes.DIALOG_BODY}>
              <form
                className="form-group"
                onSubmit={this.onSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label>Enter your todo</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Add Todo..."
                  style={{ flex: "10", marginBottom: "5px" }}
                  value={title}
                  onChange={this.onChange}
                />
                <label>Start Date</label>

                <DateTimePicker
                  // disabledDays={{ before: today }}
                  minDate={new Date()}
                  className="form-control"
                  onChange={this.onChangeStartDate}
                  value={startDate}
                  style={{ marginBottom: "5px" }}
                />
                <label>End Date</label>
                <DateTimePicker
                  minDate={new Date()}
                  className="form-control"
                  onChange={this.onChangeEndDate}
                  value={endDate}
                  style={{ marginBottom: "5px" }}
                />
                <label className="pt-1 mr-1">Add an importance level</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left"
                  }}
                >
                  <StarRatingComponent
                    className="text-center"
                    name="star"
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div>
                <label>Enter the type for this todo</label>
                <select
                  className="form-control"
                  value={type}
                  onChange={this.onChangeType}
                >
                  <option value="work">work</option>
                  <option value="personal">personal</option>
                </select>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                  style={{ flex: "1", marginTop: "5px" }}
                />
              </form>
              <NotificationContainer />
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

// <label>Enter the level of urgent for this todo</label>
// <select
//   className="form-control"
//   value={this.state.urgentLevel}
//   onChange={this.onChangeUrgent}
// >
//   <option value="one">one</option>
//   <option value="two">two</option>
//   <option value="three">three</option>
//   <option value="four">four</option>
//   <option value="five">five</option>
// </select>
export default AddTodo;

// <Switch
// className="pt-1"
// checked={isPublic}
// label="All day"
// large
// onChange={this.handlePublicChange}
// />
