import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import TodoList from './TodoList';
import observableTodoStore from '../stores/ObservableTodoStore';

class App extends Component {
	render() {
		return (
			<div>
				<TodoList store={observableTodoStore} />
				<DevTools />
			</div>
		);
	}
}

export default App;
