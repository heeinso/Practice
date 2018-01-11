import React from 'react';

class App extends React.Component {
  sayHey() {
    alert("hey");
  }

  render() {
    let text = "dev-server";

    let pStyle = {
      color: 'aqua',
      backgroundColor: 'black'
    };

    return (
      <div>
        <h1>Hello React!</h1>
        <h2>Welcome to {text}</h2>
        <button onClick={this.sayHey}>Click me</button>
        <p style={pStyle}>{1 == 1 ? 'True' : 'False'}</p>
      </div>
    );
  }
}

export default App;