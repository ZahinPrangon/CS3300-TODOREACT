import React from "react";
import TodoItem from "../Todo-Item/Todo-Item";
import todosData from "../Todo-Data/Todo-Data";
import AddTodo from "../Add-Todo/Add-Todo";
import Alert from "../Alert/Alert";
import "./Main-Content.styles.css";
import { Summary } from "../Summary/Summary";
import {
  format,
  isToday,
  isTomorrow,
  isThisWeek,
  differenceInMinutes
} from "date-fns";

import {
  Classes,
  H3,
  Tab,
  Tabs,
  Divider,
  Callout,
  ProgressBar,
  Button,
  Overlay
} from "@blueprintjs/core";
import Clock from "react-live-clock";
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
  addTodo = (title, startDate, endDate, urgentLevel, type) => {
    let oldid = this.state.todos[this.state.todos.length - 1].id;
    let newid = oldid + 1;
    const newTodo = {
      id: newid,
      title: title,
      start: startDate,
      end: endDate,
      urgentLevel: urgentLevel,
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

  handleNavbarTabChange = (navbarTabId: TabId) =>
    this.setState({ navbarTabId });

  handleSearchChange = e => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value
    });
  };
  showCalendar = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    console.log(this.state.show);
  };

  render() {
    moment.locale("en-GB");
    const localizer = momentLocalizer(moment);
    // Destructuring the state
    const { todos, alert, show } = this.state;

    // const totalPendingTodos = todos.filter(todo => !todo.completed).length;
    const todoItems = todos.map(item => (
      <TodoItem
        key={item.id}
        handleChange={this.handleChange}
        item={item}
        deleteTodo={this.deleteTodo}
      />
    ));

    const totalCompleted = todos.filter(item => item.completed !== true).length;

    // Get total minutes to complete task
    let totalTime = 0;
    const totaltimeRequired = todos.forEach(
      element => (totalTime += differenceInMinutes(element.end, element.start))
    );
    // const notificationsToday = todos
    //   .filter(
    //     item =>
    //       isToday(item.start) &&
    //       differenceInHours(item.end, item.start) < 24
    //   )
    //   .map(item => (
    //     <TodoItem
    //       key={item.id}
    //       handleChange={this.handleChange}
    //       item={item}
    //       deleteTodo={this.deleteTodo}
    //     />
    //   ));

    const todayItems = todos
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

    const AllPanel = () => (
      <div>
        <H3>All Todos</H3>

        <p>You have {todoItems.length} todos in total</p>
        <p>Time required {totalTime} minutes</p>
        <p>
          {totalCompleted} of {todoItems.length} completed
        </p>
        <p className={Classes.RUNNING_TEXT}>{todoItems}</p>
      </div>
    );

    const TodayPanel = () => (
      <div>
        <H3>Today</H3>
        <p>You have {todayItems.length} todos today</p>
        <p>
          {todayCompleted} of {todayItems.length} completed
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

    const SummaryPanel = () => (
      <div>
        <Summary todos={todos} />
      </div>
    );

    const workTodosItem = todos
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

    const UpcomingPanel = () => (
      <div>
        <H3>Upcoming</H3>
      </div>
    );

    return (
      <div className="container-fluid">
        <Button onClick={this.showCalendar}>
          {show === false ? "Show Calendar" : "Add a Todo or view list"}
        </Button>
        {show === false ? (
          <div className="row">
            <div className="col-md">
              <Example className="docs-tabs-example" {...this.props}>
                <Tabs
                  animate={this.state.animate}
                  id="TabsExample"
                  key={this.state.vertical ? "vertical" : "horizontal"}
                  renderActiveTabPanelOnly={this.state.activePanelOnly}
                  vertical={this.state.vertical}
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
                    id="upcoming"
                    title="Upcoming"
                    panel={<UpcomingPanel />}
                  />
                  <Tab id="work" title="Work Todos" panel={<WorkPanel />} />
                  <Tab
                    id="personal"
                    title="Personal Todos"
                    panel={<PersonalPanel />}
                  />
                  <Tab
                    id="search"
                    title="Search"
                    panel={<SummaryPanel />}
                    panelClassName="next7-panel"
                  />
                  <Tabs.Expander />
                </Tabs>
              </Example>
            </div>
            <Divider />
            <div className="col-lg">
              <div class="d-flex justify-content-around">
                <Alert alert={alert} />
                <AddTodo addTodo={this.addTodo} setAlert={this.setAlert} />
              </div>
              <div className="row text-center p-2">
                <Callout
                  title={format(new Date(), "'Today is' MM/dd/yyyy iiii")}
                >
                  <Clock format={"HH:mm:ss"} ticking={true} />
                </Callout>
              </div>
              <div className="card p-2 mb-1">
                <label>Total Progress towards less work</label>
                <ProgressBar
                  animate={false}
                  stripes={false}
                  value={1 / todoItems.length}
                />
              </div>
              <div className="card">
                <H3 className="text-center p-1">Notifications</H3>
              </div>
            </div>
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
              // onSelectEvent={this.showEvent} // Shows todo details
              // onSelectSlot={this.handleSelect}
              views={["month", "week", "day", "agenda"]}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MainContent;
// {notificationsToday.length > 0 ? (
//   { notificationsToday }
// ) : (
//   <p>No todos in the next 24 hours</p>
// )}
