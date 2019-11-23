import React from "react";
import MainContent from "./components/Main-Content/Main-Content";
import Header from "./components/Header/Header";
import "./style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CalendarUI from "./components/CalendarUI/CalendarUI";

//Class component
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route exact path="/calendar" component={CalendarUI} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
