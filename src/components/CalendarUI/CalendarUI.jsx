import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import todosData from "../Todo-Data/Todo-Data";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class CalendarUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todosData,
      view: "day",
      visible: false
    };
  }

  showEvent = (todos, visible) => {
    alert(todos.title);
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
