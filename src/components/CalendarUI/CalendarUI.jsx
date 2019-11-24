import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import todosData from "../Todo-Data/Todo-Data";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class CalendarUI extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todosData,
      view: "day",
      visible: false
    };
  }

  showEvent = (todos, visible) => {
    alert(todos.title);
    console.log(todos);
  };

  handleSelect = ({ start, end, urgentLevel }) => {
    let oldid = this.state.todos[this.state.todos.length - 1].id;
    let newid = oldid + 1;

    const title = window.prompt("Add New Todo");
    if (title && urgentLevel) {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            start,
            end,
            title,
            newid
          }
        ]
      });
    }
  };

  render() {
    return (
      <div style={{ height: 700, padding: "20px" }}>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.todos}
          showMultiDayTimes
          step={60}
          popup={true}
          onSelectEvent={this.showEvent} // Shows todo details
          onSelectSlot={this.handleSelect}
          views={["month", "week", "day", "agenda"]}
        />
      </div>
    );
  }
}

export default CalendarUI;
