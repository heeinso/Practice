import React from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout';
import { login } from '../utils/auth';

export default class Login extends React.Component {
	static async getInitialProps({ req }) {
		const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

		const API_URL = process.browser
			? `${protocol}://${window.location.host}/api/login.js`
			: `${protocol}://${req.headers.host}/api/login.js`;

		return { API_URL };
	}

	constructor(props) {
		super(props);
		this.state = { username: '', error: '' };
	}

	handleChange = e => {
		this.setState({ username: e.target.value });
	};

	handleSubmit = async e => {
		e.preventDefault();

		const url = this.props.API_URL;
		const username = this.state.username;

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username }),
			});
			if (response.ok) {
				const { token } = await response.json();
				login({ token });
			} else {
				console.error('Login failed.');
				let error = new Error(response.statusText);
				error.response = response;
				return Promise.reject(error);
			}
		} catch (error) {
			console.error(
				'You have an error in your code or there are Network issues.',
				error
			);
			throw new Error(error);
		}
	};

	render() {
		return (
			<Layout>
				<div className="login">
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="username">GitHub username</label>

						<input
							type="text"
							id="username"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>

						<button type="submit">Login</button>

						<p className={`error ${this.state.error && 'show'}`}>
							{this.state.error && `Error: ${this.state.error}`}
						</p>
					</form>
				</div>
				<style jsx>{`
					.login {
						max-width: 340px;
						margin: 0 auto;
						padding: 1rem;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					form {
						display: flex;
						flex-flow: column;
					}
					label {
						font-weight: 600;
					}
					input {
						padding: 8px;
						margin: 0.3rem 0 1rem;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.error {
						margin: 0.5rem 0 0;
						display: none;
						color: brown;
					}
					.error.show {
						display: block;
					}
				`}</style>
			</Layout>
		);
	}
}
