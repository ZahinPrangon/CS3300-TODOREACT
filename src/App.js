import React from "react";
import MainContent from "./components/Main-Content/Main-Content";
import "./style.css";

//Class component
class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <MainContent />
        </div>
      </div>
    );
  }
}

export default App;
