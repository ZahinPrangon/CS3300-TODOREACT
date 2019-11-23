import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import todosData from "../Todo-Data/Todo-Data";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const state = {
  todos: todosData,
  view: "day"
};

const CalendarUI = () => (
  <div style={{ height: 700, padding: "20px" }}>
    <Calendar
      selectable
      localizer={localizer}
      events={state.todos}
      showMultiDayTimes
      step={60}
      popup={true}
      // max={new Date("December 31, 2099")}
      views={["month", "week", "day", "agenda"]}
    />
  </div>
);

export default CalendarUI;
