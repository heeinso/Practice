import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Hello from './components/Hello';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
ReactDOM.render(<Hello />, rootElement);
