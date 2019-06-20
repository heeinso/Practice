import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import TodoList from './TodoList';
import todoStore from '../stores/TodoStore';

class App extends Component {
	render() {
		return (
			<div>
				<TodoList store={todoStore} />
				<DevTools />
			</div>
		);
	}
}

export default App;
