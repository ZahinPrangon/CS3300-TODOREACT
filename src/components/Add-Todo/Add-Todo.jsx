import React from "react";
import DateTimePicker from "react-datetime-picker";

class AddTodo extends React.Component {
  // Component state to get the title from the input
  state = {
    title: "",
    date: new Date(),
    urgentLevel: "one"
  };

  onChangeDate = date => {
    this.setState({ date: date });
  };

  // Takes the input state from the event's target value
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeUrgent = event => {
    console.log(this.state.urgentLevel);
    this.setState({ urgentLevel: event.target.value });
  };

  // EventListener on submit of form
  onSubmit = e => {
    // Prevents from automatically submitting the form on load
    e.preventDefault();
    // if nothing is entered in the title box
    if (this.state.title === "") {
      this.props.setAlert("Please enter something");
    } else if (this.state.date === "") {
      this.props.setAlert("Please enter a date and time");
    } else {
      // Adding addTodo function as prop and passing the state's title as param
      this.props.addTodo(
        this.state.title,
        this.state.date,
        this.state.urgentLevel
      );
      // Changing the state to an empty string
      this.setState({ title: "", date: "", urgentLevel: "one" });
    }
  };

  render() {
    return (
      <div>
        <form
          className="form-group"
          onSubmit={this.onSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Add Todo..."
            style={{ flex: "10", marginBottom: "5px" }}
            value={this.state.title}
            onChange={this.onChange}
          />
          <DateTimePicker
            className="form-control"
            onChange={this.onChangeDate}
            value={this.state.date}
            style={{ marginBottom: "5px" }}
            calendarAriaLabel="close"
          />

          <select value={this.state.urgentLevel} onChange={this.onChangeUrgent}>
            <option value="one">one</option>
            <option value="two">two</option>
            <option value="three">three</option>
            <option value="four">four</option>
            <option value="five">five</option>
          </select>
          <input
            className="btn btn-primary"
            type="submit"
            value="Submit"
            style={{ flex: "1", marginTop: "5px" }}
          />
        </form>
      </div>
    );
  }
}

export default AddTodo;
