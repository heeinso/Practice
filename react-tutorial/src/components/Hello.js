import React from 'react';

class Hello extends React.Component {
  handleClick() {
    this.input.value = "";
    this.input.focus();
  }

  render() {
    return (
      <div>
        <input ref={ref => this.input = ref}/>
        <button onClick={this.handleClick.bind(this)}>Click me</button>
      </div>
    );
  }
}

export default Hello;