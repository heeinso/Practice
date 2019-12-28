import React from 'react';
import { Link } from 'react-router';

import ArticleActions from './ArticleActions';

const ArticleMeta = ({ article, canModify }) => {
	const {
		author: { username, image },
		createdAt,
	} = article;
	return (
		<div className="article-meta">
			<Link to={`@${username}`}>
				<img src={image} />
			</Link>

			<div className="info">
				<Link to={`@${username}`} className="author">
					{username}
				</Link>
				<span className="date">{new Date(createdAt).toDateString()}</span>
			</div>

			<ArticleActions canModify={canModify} article={article} />
		</div>
	);
};

export default ArticleMeta;
