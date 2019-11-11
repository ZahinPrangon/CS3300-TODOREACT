import React from "react"

function TodoItem(props) {
    // Completed Styles
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    // Button Styles
    const btnStyle = {
        background: '#ff0000',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer'
    };

    return (
        <div className="todo-item">
            <hr />
            <input 
                type="checkbox" 
                checked={props.item.completed} 
                onChange={() => props.handleChange(props.item.id)}
            />
            
            <div style={props.item.completed ? completedStyle : null}>
                <h3>{props.item.text}</h3>
            </div>
            <button onClick = {props.deleteTodo.bind(this, props.item.id)} style = {btnStyle}>DELETE</button>
        </div>
    )   
}

export default TodoItem