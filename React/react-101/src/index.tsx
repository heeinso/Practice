import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './App';

const store = createStore(reducers);
const rootElement: HTMLElement | null = document.getElementById('root');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
