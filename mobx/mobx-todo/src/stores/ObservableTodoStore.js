import { autorun, computed, decorate, observable } from 'mobx';

class ObservableTodoStore {
	todos = [];
	pendingRequests = 0;

	constructor() {
		autorun(() => console.log(this.report));
	}

	get completedTodosCount() {
		return this.todos.filter(todo => todo.completed === true).length;
	}

	get report() {
		if (this.todos.length === 0) return '<none>';
		return (
			`Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`
		);
	}

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null,
		});
	}
}

decorate(ObservableTodoStore, {
	todos: observable,
	pendingRequests: observable,
	completedTodosCount: computed,
	report: computed,
});

const observableTodoStore = new ObservableTodoStore();

export default observableTodoStore;
