import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
	onClick: (payload, commentId) =>
		dispatch({ type: 'DELETE_COMMENT', payload, commentId }),
});

const DeleteButton = ({ commentId, show, slug, onClick }) => {
	const del = () => {
		const payload = agent.Comments.delete(slug, commentId);
		onClick(payload, commentId);
	};

	return (
		show && (
			<span className="mod-options">
				<i className="ion-trash-a" onClick={del}></i>
			</span>
		)
	);
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
