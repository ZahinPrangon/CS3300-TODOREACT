import React, { FunctionComponent } from "react";
import TodoItem from "../Todo-Item/Todo-Item";
import todosData from "../Todo-Data/Todo-Data";
import AddTodo from "../Add-Todo/Add-Todo";
import Alert from "../Alert/Alert";
import "./Main-Content.styles.css";
import { Summary } from "../Summary/Summary";
import { isToday, isTomorrow, isThisWeek } from "date-fns";

import {
  Alignment,
  Classes,
  H3,
  H5,
  InputGroup,
  Navbar,
  Switch,
  Tab,
  Tabs,
  Button,
  ProgressBar,
  Divider,
  ButtonGroup
} from "@blueprintjs/core";

import { Example, handleBooleanChange } from "@blueprintjs/docs-theme";
// import ChartUI from "../ChartUI/ChartUI";
// import { Doughnut } from "react-chartjs-2";

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

      activePanelOnly: false,
      animate: true,
      navbarTabId: "Today",
      vertical: false
    };
  }

  toggleActiveOnly = handleBooleanChange(activePanelOnly =>
    this.setState({ activePanelOnly })
  );
  toggleAnimate = handleBooleanChange(animate => this.setState({ animate }));
  toggleVertical = handleBooleanChange(vertical => this.setState({ vertical }));

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
  addTodo = (title, startDate, endDate, urgentLevel) => {
    let oldid = this.state.todos[this.state.todos.length - 1].id;
    let newid = oldid + 1;
    const newTodo = {
      id: newid,
      title: title,
      start: startDate,
      end: endDate,
      urgentLevel: urgentLevel,
      completed: false
    };
    // Sets State with todos as previous todos and then adding the new todo in the last of the array
    this.setState({ todos: [...this.state.todos, newTodo] });
    console.log(newTodo);
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

  render() {
    const options = (
      <div>
        <H5>Props</H5>
        <Switch
          checked={this.state.animate}
          label="Animate indicator"
          onChange={this.toggleAnimate}
        />
        <Switch
          checked={this.state.vertical}
          label="Use vertical tabs"
          onChange={this.toggleVertical}
        />
        <Switch
          checked={this.state.activePanelOnly}
          label="Render active tab panel only"
          onChange={this.toggleActiveOnly}
        />
      </div>
    );

    // Destructuring the state
    const { todos, alert } = this.state;
    const totalTodos = todos.length;

    const totalPendingTodos = todos.filter(todo => !todo.completed).length;
    const todoItems = todos.map(item => (
      <TodoItem
        key={item.id}
        handleChange={this.handleChange}
        item={item}
        deleteTodo={this.deleteTodo}
      />
    ));

    const todayItemsArray = todos.filter(todo => isToday(todo.start) === true);
    const todayItems = todayItemsArray.map(item => (
      <TodoItem
        key={item.id}
        handleChange={this.handleChange}
        item={item}
        deleteTodo={this.deleteTodo}
      />
    ));

    const tommorowItemsArray = todos.filter(
      todo => isTomorrow(todo.start) === true
    );
    const tommorowItems = tommorowItemsArray.map(item => (
      <TodoItem
        key={item.id}
        handleChange={this.handleChange}
        item={item}
        deleteTodo={this.deleteTodo}
      />
    ));

    const thisWeek = todos.filter(item => isThisWeek(item.start) === true);
    const thisWeekItems = thisWeek.map(item => {
      return (
        <TodoItem
          key={item.id}
          handleChange={this.handleChange}
          item={item}
          deleteTodo={this.deleteTodo}
        />
      );
    });

    const TodayPanel = () => (
      <div>
        <H3>Today</H3>
        <p className={Classes.RUNNING_TEXT}>{todayItems}</p>
      </div>
    );

    const AngularPanel = () => (
      <div>
        <H3>Example panel: Angular</H3>
        <p className={Classes.RUNNING_TEXT}>{tommorowItems}</p>
      </div>
    );

    const EmberPanel = () => (
      <div>
        <H3>Example panel: Ember</H3>
        <p className={Classes.RUNNING_TEXT}>
          Ember.js is an open-source JavaScript application framework, based on
          the model-view-controller (MVC) pattern. It allows developers to
          create scalable single-page web applications by incorporating common
          idioms and best practices into the framework. What is your favorite JS
          framework?
        </p>
        <input className={Classes.INPUT} type="text" />
      </div>
    );

    const BackbonePanel = () => (
      <div>
        <H3>Backbone</H3>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <Example
              className="docs-tabs-example"
              options={options}
              {...this.props}
            >
              <Navbar>
                <Navbar.Group>
                  <Navbar.Heading>
                    Current page: <strong>{this.state.navbarTabId}</strong>
                  </Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                  {/* controlled mode & no panels (see h1 below): */}
                  <Tabs
                    animate={this.state.animate}
                    id="navbar"
                    large={true}
                    onChange={this.handleNavbarTabChange}
                    selectedTabId={this.state.navbarTabId}
                  >
                    <Tab className="bp-3" id="Home" title="Home" />
                    <Tab id="Files" title="Files" />
                    <Tab id="Builds" title="Builds" />
                  </Tabs>
                </Navbar.Group>
              </Navbar>
              {/* uncontrolled mode & each Tab has a panel: */}
              <Tabs
                animate={this.state.animate}
                id="TabsExample"
                key={this.state.vertical ? "vertical" : "horizontal"}
                renderActiveTabPanelOnly={this.state.activePanelOnly}
                vertical={this.state.vertical}
              >
                <Tab id="today" title="Today" panel={<TodayPanel />} />
                <Tab id="tommorow" title="Tommorow" panel={<AngularPanel />} />
                <Tab
                  id="Next-7-days"
                  title="Next 7 days"
                  panel={<EmberPanel />}
                  panelClassName="next7-panel"
                />
                <Tab id="Upcoming" title="Backbone" panel={<BackbonePanel />} />
                <Tabs.Expander />

                <InputGroup
                  className={Classes.FILL}
                  type="text"
                  placeholder="Search Todos..."
                />
              </Tabs>
            </Example>
          </div>

          <Divider />
          <div className="col-lg">
            <div className="d-flex">
              <div className="todo">
                <Alert alert={alert} />
                <AddTodo addTodo={this.addTodo} setAlert={this.setAlert} />
              </div>
              <div>
                <h5 className="text-center">SUMMARY</h5>
                <Summary todos={todos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;

// <div>
// <div>{this.state.today && todayItems}</div>
// </div>
// <div>
// <div>{this.state.tommorow && tommorowItems}</div>
// </div>
// <div>
// <div>{this.state.all && todoItems}</div>
// </div>
// <div>
// <div>{this.state.thisWeek && thisWeekItems}</div>
// </div>

// <span
// style={{ color: "Red", fontWeight: "bold", padding: "5px" }}
// >
// Upcoming
// </span>
// <span>{`${totalPendingTodos} of ${totalTodos} left`}</span>

// <ButtonGroup minimal={true} className="text-left">
// <Button
//   icon="timeline-events"
//   text="Today"
//   onClick={this.todayTodos.bind(this)}
// />
// <Button
//   icon="timeline-events"
//   text="Tommorow"
//   onClick={this.tommorowTodos.bind(this)}
// />
// <Button
//   icon="timeline-events"
//   text="All"
//   onClick={this.allTodos.bind(this)}
// />
// <Button
//   icon="timeline-events"
//   text="This Week"
//   onClick={this.thisWeekTodos.bind(this)}
// />
// </ButtonGroup>
