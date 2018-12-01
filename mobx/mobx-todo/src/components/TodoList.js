import React, { Component } from 'react';
import { observer } from 'mobx-react';

import TodoItem from './TodoItem';

const TodoList = observer(
	class TodoList extends Component {
		render() {
			const store = this.props.store;
			return (
				<div>
					{store.report}
					<ul>
						{store.todos.map((todo, idx) => (
							<TodoItem todo={todo} key={idx} />
						))}
					</ul>
					{store.pendingRequests > 0 ? <div>Loading...</div> : null}
					<button onClick={this.onNewTodo}>New Todo</button>
					<small> (double-click a todo to edit)</small>
				</div>
			);
		}

		onNewTodo = () => {
			this.props.store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
		};
	}
);

export default TodoList;
