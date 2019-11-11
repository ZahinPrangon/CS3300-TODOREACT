import React from 'react'

class AddTodo extends React.Component {
    // Component state to get the text from the input
    state = {
        text: ''
    }

    // Takes the input state from the event's target value
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // EventListener on submit of form
    onSubmit = (e) => {
        // Prevents from automatically submitting the form on load
        e.preventDefault();
        // if nothing is entered in the text box
        if (this.state.text === '') {
            this.props.setAlert('Please enter something')
        } else {
            // Adding addTodo function as prop and passing the state's text as param
            this.props.addTodo(this.state.text);
            // Changing the state to an empty string
            this.setState({ text: '' });
        }
    }

    render() {
        return (
            <div>
            <form onSubmit = {this.onSubmit} style = {{ display: 'flex' }} >
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Add Todo..."
                    style = {{ flex: '10', padding: '5px' }}
                    value = {this.state.text}
                    onChange={this.onChange}
                />
                <input 
                    type="submit" 
                    value="Submit"
                    className = "btn"
                    style = {{flex: '1'}}    
                />
            </form>
            </div>
        )
    }
}

export default AddTodo