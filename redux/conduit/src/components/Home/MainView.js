import React from 'react';
import { connect } from 'react-redux';

import agent from '../../agent';
import ArticleList from '../ArticleList';

const YourFeedTab = ({ token, tab, onTabClick }) => {
	const clickHandler = e => {
		e.preventDefault();
		onTabClick('feed', agent.Articles.feed());
	};

	return (
		token && (
			<li className="nav-item">
				<a
					href=""
					className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
					onClick={clickHandler}>
					Your Feed
				</a>
			</li>
		)
	);
};

const GlobalFeedTab = ({ tab, onTabClick }) => {
	const clickHandler = e => {
		e.preventDefault();
		onTabClick('all', agent.Articles.all());
	};
	return (
		<li className="nav-item">
			<a
				href=""
				className={tab === 'all' ? 'nav-link active' : 'nav-link'}
				onClick={clickHandler}>
				Global Feed
			</a>
		</li>
	);
};

const TagFilterTab = ({ tag }) => {
	return (
		tag && (
			<li className="nav-item">
				<a href="" className="nav-link active">
					<i className="ion-pound"></i> {tag}
				</a>
			</li>
		)
	);
};

const mapStateToProps = state => ({
	...state.articleList,
	token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
	onSetPage: (tab, page) =>
		dispatch({
			type: 'SET_PAGE',
			payload:
				tab === 'feed' ? agent.Articles.feed(page) : agent.Articles.all(page),
			page,
		}),
	onTabClick: (tab, payload) => dispatch({ type: 'CHANGE_TAB', tab, payload }),
});

const MainView = ({
	articles,
	articlesCount,
	currentPage,
	page,
	tab,
	tag,
	token,
	onSetPage,
	onTabClick,
}) => {
	return (
		<div className="col-md-9">
			<div className="feed-toggle">
				<ul className="nav nav-pills outline-active">
					<YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />
					<GlobalFeedTab tab={tab} onTabClick={onTabClick} />
					<TagFilterTab tag={tag} />
				</ul>
			</div>

			<ArticleList
				articles={articles}
				articlesCount={articlesCount}
				currentPage={currentPage}
				onSetPage={onSetPage}
			/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
