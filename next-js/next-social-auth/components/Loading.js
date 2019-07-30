import React from 'react';

export const Loading = () => (
	<div className="loading-wrapper fadein-slow">
		<h4>Loading... 💃 🕺</h4>
		<div className="loading">
			<div className="background">
				<i className="icon-heroku" />
			</div>
			<div className="spinner" />
		</div>
	</div>
);
