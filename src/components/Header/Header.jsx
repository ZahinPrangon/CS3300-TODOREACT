import React from 'react'

function Header() {
    return (
        <div style = {headerStyle}>
            <h1>TODOLIST</h1>
        </div>
    )
}
// Header Styles
const headerStyle = {
    background: 'grey',
    color: '#fff',
    fontWeight: '600',
    letterSpacing: '10px',
    textAlign: 'center',
    padding: '10px',
    marginBottom: '5px'
}
export default Header;