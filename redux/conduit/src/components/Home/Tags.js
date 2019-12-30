import React from 'react';

import agent from '../../agent';

const Tags = ({ tags, onClickTag }) => {
	if (tags) {
		return (
			<div className="tag-list">
				{tags.map(tag => {
					const handleClick = e => {
						e.preventDefault();
						onClickTag(tag, agent.Articles.byTag(tag));
					};

					return (
						<a key={tag} className="tag-default tag-pill" onClick={handleClick}>
							{tag}
						</a>
					);
				})}
			</div>
		);
	} else {
		return <div>Loading Tags...</div>;
	}
};

export default Tags;
