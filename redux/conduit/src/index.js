import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';

const defaultState = {
	checked: false,
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'TOGGLE':
			return { ...state, checked: !state.checked };
	}
	return state;
};

const store = createStore(reducer);

class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentWillMount() {
		store.subscribe(() => this.setState(store.getState()));
	}

	handleClick = () => store.dispatch({ type: 'TOGGLE' });

	render() {
		return (
			<div>
				<h1>TODO</h1>
				<div>
					Learn Redux&nbsp;
					<input
						type="checkbox"
						checked={!!this.state.checked}
						onClick={this.handleClick}
					/>
				</div>
				{this.state.checked && <h2>Done!</h2>}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
