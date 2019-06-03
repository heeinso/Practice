import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';

import Layout from '../components/layout';
import { withAuthSync } from '../utils/auth';

const Profile = props => {
	const { name, login, bio, avatarUrl } = props.data;

	return (
		<Layout>
			<img src={avatarUrl} alt="Avatar" />
			<h1>{name}</h1>
			<p className="lead">{login}</p>
			<p>{bio}</p>

			<style jsx>{`
				img {
					max-width: 200px;
					border-radius: 0.5rem;
				}
				h1 {
					margin-bottom: 0;
				}
				p {
					color: #6a737d;
				}
				.lead {
					margin-top: 0;
					font-size: 1.5rem;
					font-weight: 300;
					color: #666;
				}
			`}</style>
		</Layout>
	);
};

Profile.getInitialProps = async ctx => {
	const { token } = nextCookie(ctx);
	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

	const API_URL = process.browser
		? `${protocol}://${window.location.host}/api/profile.js`
		: `${protocol}://${ctx.req.headers.host}/api/profile.js`;

	const redirectOnError = () =>
		process.browser
			? Router.push('/login')
			: ctx.res.writeHead(301, { Location: '/login' });

	try {
		const response = await fetch(API_URL, {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: JSON.stringify({ token }),
			},
		});

		if (response.ok) {
			return await response.json();
		} else {
			return redirectOnError();
		}
	} catch (error) {
		return redirectOnError();
	}
};

export default withAuthSync(Profile);
