import React from "react";
import TodoItem from "../Todo-Item/Todo-Item";
import todosData from "../Todo-Data/Todo-Data";

import "./Main-Content.styles.css";
import { Summary } from "../Summary/Summary";
import Header from "../Header/Header";

import {
  // format,
  isToday,
  isTomorrow,
  isThisWeek,
  // differenceInHours,
  compareAsc,
  differenceInMinutes
} from "date-fns";

import {
  Classes,
  H3,
  Tab,
  Tabs,
  Divider,
  Alert
  // Callout,
  // ProgressBar,
  // Button,
  // ButtonGroup
} from "@blueprintjs/core";
import { Example, handleBooleanChange } from "@blueprintjs/docs-theme";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    // State initialized here for todosData and Alert
    this.state = {
      todos: todosData,
      alert: null,
      all: false,
      today: false,
      tommorow: false,
      thisWeek: false,
      filtered: [],
      show: false,
      search: "",
      activePanelOnly: false,
      animate: true,
      navbarTabId: "Today",
      vertical: false,
      view: "day",
      visible: false
    };
  }

  toggleActiveOnly = handleBooleanChange(activePanelOnly =>
    this.setState({ activePanelOnly })
  );
  toggleAnimate = handleBooleanChange(animate => this.setState({ animate }));
  toggleVertical = handleBooleanChange(vertical => this.setState({ vertical }));

  showEvent = (todos, isOpen) => {
    return alert(todos.start);
  };

  // Update state so that the item with the given id flips changes from false to true
  // HandleChange function changes the state takes in previous state
  // Maps the todo my checking if id matches and then change the bool in complete in todo array
  handleChange = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          //spread operator
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos // Sets todos as updated todos
      };
    });
  };

  // Adds Todo
  // Takes last object's id from the todos array in oldid
  // Increments it by 1
  // Creates new todo objet with id as newid, text from the state and completed default as false
  addTodo = (title, startDate, endDate, rating, type) => {
    let oldid = this.state.todos[this.state.todos.length - 1].id;
    let newid = oldid + 1;
    const newTodo = {
      id: newid,
      title: title,
      start: startDate,
      end: endDate,
      rating: rating,
      type: type,
      completed: false
    };
    // Sets State with todos as previous todos and then adding the new todo in the last of the array
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  // Deletes Todos
  // Sets state by using spread operator and then uses the filter function to check if the id of todo is of the current id
  deleteTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  // Sets alert when empty input field is submitted
  setAlert = msg => {
    // Sets state with the message passed into alert state
    this.setState({
      alert: { msg }
    });

    // Removes the alert component by setting it to null after 4 seconds
    setTimeout(() => {
      this.setState({ alert: null });
    }, 4000);
  };

  todayTodos = () => {
    const { today } = this.state;
    this.setState({ today: !today });
  };

  tommorowTodos = () => {
    const { tommorow } = this.state;
    this.setState({ tommorow: !tommorow });
  };

  thisWeekTodos = () => {
    const { thisWeek } = this.state;
    this.setState({ thisWeek: !thisWeek });
  };

  allTodos = () => {
    const { all } = this.state;
    this.setState({ all: !all });
  };

  handleNavbarTabChange = navbarTabId => this.setState({ navbarTabId });

  showCalendar = () => {
    this.setState({ show: true });
  };

  showHome = () => {
    this.setState({ show: false });
  };

  showEvent = event => {
    return alert(event.title);
  };
  render() {
    moment.locale("en-GB");
    const localizer = momentLocalizer(moment);
    // Destructuring the state
    const { todos, show } = this.state;

    // const totalPendingTodos = todos.filter(todo => !todo.completed).length;
    const todoItems = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .map(item => (
        <TodoItem
          key={item.id}
          handleChange={this.handleChange}
          item={item}
          deleteTodo={this.deleteTodo}
        />
      ));

    const totalCompleted = todos.filter(item => item.completed === false)
      .length;

    // Get total minutes to complete task
    let totalTime = 0;
    // const totaltimeRequired = todos.forEach(
    //   element => (totalTime += differenceInMinutes(element.end, element.start))
    // );

    const todayItems = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .filter(item => isToday(item.start) === true)
      .map(item => (
        <TodoItem
          key={item.id}
          handleChange={this.handleChange}
          item={item}
          deleteTodo={this.deleteTodo}
        />
      ));

    const todayCompleted = todayItems.filter(todo => todo.completed !== false)
      .length;

    const tommorowItems = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .filter(item => isTomorrow(item.start) === true)
      .map(item => (
        <TodoItem
          key={item.id}
          handleChange={this.handleChange}
          item={item}
          deleteTodo={this.deleteTodo}
        />
      ));

    const thisWeekItems = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .filter(item => isThisWeek(item.start) === true)
      .map(item => {
        return (
          <TodoItem
            key={item.id}
            handleChange={this.handleChange}
            item={item}
            deleteTodo={this.deleteTodo}
          />
        );
      });

    // Time required for this week's
    // TODO - need to fix
    const totaltimeRequired = todos
      .filter(
        element =>
          isThisWeek(element.start) === true && element.completed === false
      )
      .forEach(
        element =>
          (totalTime += differenceInMinutes(element.end, element.start))
      );
    console.log(totaltimeRequired);

    const AllPanel = () => (
      <div>
        <H3>All Todos</H3>

        <p>You have {todoItems.length} todos in total</p>
        <p>Time required {totalTime} minutes</p>
        <p>
          {totalCompleted} of {todoItems.length} needs to be completed
        </p>
        <p className={Classes.RUNNING_TEXT}>{todoItems}</p>
      </div>
    );

    const TodayPanel = () => (
      <div>
        <H3>Today</H3>
        <p>You have {todayItems.length} todos today</p>
        <p>
          {todayCompleted} of {todayItems.length} needs to be completed
        </p>
        <p className={Classes.RUNNING_TEXT}>{todayItems}</p>
      </div>
    );

    const TommorowPanel = () => (
      <div>
        <H3>Tommorow</H3>
        <p>You have {tommorowItems.length} todos today</p>

        <p className={Classes.RUNNING_TEXT}>{tommorowItems}</p>
      </div>
    );

    const urgentItems = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .filter(item => item.urgentLevel === "five" || isToday(item.start))
      .map(item => {
        return (
          <TodoItem
            key={item.id}
            handleChange={this.handleChange}
            item={item}
            deleteTodo={this.deleteTodo}
          />
        );
      });

    const UrgentPanel = () => (
      <div>
        <H3>URGENT</H3>
        <h5>Todos with most urgent level or due today</h5>
        {urgentItems}
      </div>
    );

    const workTodosItem = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .filter(todo => todo.type === "work")
      .map(item => {
        return (
          <TodoItem
            key={item.id}
            handleChange={this.handleChange}
            item={item}
            deleteTodo={this.deleteTodo}
          />
        );
      });

    const personalTodosItem = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .filter(item => item.type === "personal")
      .map(item => {
        return (
          <TodoItem
            key={item.id}
            handleChange={this.handleChange}
            item={item}
            deleteTodo={this.deleteTodo}
          />
        );
      });

    const ThisWeekPanel = () => (
      <div>
        <H3>This Week Todos</H3>
        <p className={Classes.RUNNING_TEXT}></p>
        {thisWeekItems}
      </div>
    );

    const WorkPanel = () => (
      <div>
        <H3>Work Todos</H3>
        <p className={Classes.RUNNING_TEXT}>
          You have {workTodosItem.length} work related todos
        </p>
        <div>{workTodosItem}</div>
      </div>
    );

    const PersonalPanel = () => (
      <div>
        <H3>Personal Todos</H3>
        <p className={Classes.RUNNING_TEXT}>
          You have {personalTodosItem.length} personal todos
        </p>
        <div>{personalTodosItem}</div>
      </div>
    );

    const SummaryPanel = () => (
      <div>
        <H3>SUMMARY</H3>
        <Summary todos={todos} />
      </div>
    );

    const UpcomingPanel = () => (
      <div>
        <H3>Upcoming</H3>
        {
          // <Dropdown todos={todos} />
        }{" "}
      </div>
    );

    return (
      <div>
        <Header
          onChangeView={this.showCalendar}
          onChangeHome={this.showHome}
          alert={this.alert}
          addTodo={this.addTodo}
          setAlert={this.setAlert}
          todos={todos}
        />

        <div className="container pt-5 b">
          {show === false ? (
            <div className="row">
              <Divider />
              <div className="col-md pt-2">
                <Example className="docs-tabs-example" {...this.props}>
                  <Tabs
                    animate={this.state.animate}
                    id="TabsExample"
                    key={this.state.vertical ? "vertical" : "horizontal"}
                    renderActiveTabPanelOnly={this.state.activePanelOnly}
                    vertical={this.state.vertical}
                    large={true}
                    style={{ textDecoration: "none" }}
                  >
                    <Tab id="all" title="All" panel={<AllPanel />} />
                    <Tab id="today" title="Today" panel={<TodayPanel />} />
                    <Tab
                      id="tommorow"
                      title="Tommorow"
                      panel={<TommorowPanel />}
                    />
                    <Tab
                      id="thisWeek"
                      title="This Week"
                      panel={<ThisWeekPanel />}
                    />
                    <Tab
                      id="upcomingEvents"
                      title="Upcoming Events"
                      panel={<UpcomingPanel />}
                    />
                    <Tab
                      id="Summary"
                      title="Summary"
                      panel={<SummaryPanel />}
                    />
                    <Tab id="work" title="Work Todos" panel={<WorkPanel />} />
                    <Tab
                      id="personal"
                      title="Personal Todos"
                      panel={<PersonalPanel />}
                    />
                    <Tab id="Urgent" title="Urgent" panel={<UrgentPanel />} />
                    <Tabs.Expander />
                  </Tabs>
                </Example>
              </div>
              <Divider />
            </div>
          ) : (
            <div style={{ height: 650, padding: "20px" }}>
              <Calendar
                // selectable
                localizer={localizer}
                events={this.state.todos}
                showMultiDayTimes
                step={60}
                popup={true}
                popupOffset={30}
                onSelectEvent={this.showEvent}
                views={["month", "week", "day", "agenda"]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MainContent;
