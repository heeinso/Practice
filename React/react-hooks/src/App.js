import React from 'react';

import './App.css';

const useFetch = url => {
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(async () => {
		const response = await fetch(url);
		const data = await response.json();
		const [item] = data.results;
		setData(item);
		setLoading(false);
	}, [url]);

	return { data, loading };
};

export default () => {
	const [count, setCount] = React.useState(0);
	const { data, loading } = useFetch('https://api.randomuser.me/');

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
			{loading ? <div>...loading</div> : <div>{data.name.first}</div>}
		</div>
	);
};
