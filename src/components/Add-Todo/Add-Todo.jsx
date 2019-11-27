import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datepicker/dist/react-datepicker.css";
import {
  // AnchorButton,
  Button,
  Classes,
  // Code,
  Dialog
  // H5,
  // Intent,
  // Switch,
  // Tooltip
} from "@blueprintjs/core";
// import {
//   Example,
//   handleBooleanChange,
//   IExampleProps
// } from "@blueprintjs/docs-theme";
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
    urgentLevel: "one",
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

  onChangeUrgent = event => {
    this.setState({ urgentLevel: event.target.value });
  };

  onChangeType = event => {
    this.setState({ type: event.target.value });
  };

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
        this.state.urgentLevel,
        this.state.type
      );
      NotificationManager.success("TODO ADDED", this.state.title);
      // Changing the state to an empty string
      this.setState({
        title: "",
        startDate: "",
        endDate: "",
        urgentLevel: "one",
        type: "work"
      });
    }
  };

  render() {
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
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <label>Start Date</label>

                <DateTimePicker
                  minDate={new Date()}
                  className="form-control"
                  onChange={this.onChangeStartDate}
                  value={this.state.startDate}
                  style={{ marginBottom: "5px" }}
                />

                <label>End Date</label>

                <DateTimePicker
                  minDate={new Date()}
                  className="form-control"
                  onChange={this.onChangeEndDate}
                  value={this.state.endDate}
                  style={{ marginBottom: "5px" }}
                />
                <label>Enter the level of urgent for this todo</label>
                <select
                  className="form-control"
                  value={this.state.urgentLevel}
                  onChange={this.onChangeUrgent}
                >
                  <option value="one">one</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                  <option value="four">four</option>
                  <option value="five">five</option>
                </select>

                <label>Enter the type for this todo</label>
                <select
                  className="form-control"
                  value={this.state.type}
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

export default AddTodo;
