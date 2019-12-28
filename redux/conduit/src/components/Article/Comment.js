import React from 'react';
import { Link } from 'react-router';

import DeleteButton from './DeleteButton';

const Comment = ({ comment, currentUser, slug }) => {
	const {
		body,
		author: { username, image },
		createdAt,
		id: commentId,
	} = comment;
	const show = currentUser && currentUser.username === comment.author.username;
	return (
		<div className="card">
			<div className="card-block">
				<p className="card-text">{body}</p>
			</div>
			<div className="card-footer">
				<Link to={`@${username}`} className="comment-author">
					<img src={image} className="comment-author-img" />
				</Link>
				&nbsp;
				<Link to={`@${username}`} className="comment-author">
					{username}
				</Link>
				<span className="date-posted">
					{new Date(createdAt).toDateString()}
				</span>
				<DeleteButton show={show} slug={slug} commentId={commentId} />
			</div>
		</div>
	);
};

export default Comment;
