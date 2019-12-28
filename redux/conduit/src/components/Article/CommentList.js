import React from 'react';

import Comment from './Comment';

const CommentList = ({ comments, currentUser, slug }) => {
	return (
		<div>
			{comments.map(comment => {
				return (
					<Comment
						key={comment.id}
						comment={comment}
						currentUser={currentUser}
						slug={slug}
					/>
				);
			})}
		</div>
	);
};

export default CommentList;
