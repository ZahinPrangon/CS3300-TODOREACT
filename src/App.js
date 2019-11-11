import React from "react"
import MainContent from "./components/Main-Content/Main-Content"

import Header from "./components/Header/Header";
import './style.css';

//Class component
class App extends React.Component {  
    render() {
        return (        
            <div>
                <Header/>
                <MainContent />
            </div>   
        )
    }
}

export default App