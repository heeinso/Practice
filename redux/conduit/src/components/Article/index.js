import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import marked from 'marked';

import agent from '../../agent';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';

const mapStateToProps = state => ({
	...state.article,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload => dispatch({ type: 'ARTICLE_PAGE_LOADED', payload }),
	onUnload: () => dispatch({ type: 'ARTICLE_PAGE_UNLOADED' }),
});

class Article extends React.Component {
	componentWillMount() {
		this.props.onLoad(
			Promise.all([
				agent.Articles.get(this.props.params.id),
				agent.Comments.forArticle(this.props.params.id),
			])
		);
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		const {
			article,
			currentUser,
			comments,
			commentErrors,
			params,
		} = this.props;
		if (!article) {
			return null;
		}

		const markup = { __html: marked(article.body) };
		const canModify =
			currentUser && currentUser.username === article.author.username;

		return (
			<div className="article-page">
				<div className="banner">
					<div className="container">
						<h1>{article.title}</h1>
						<ArticleMeta article={article} canModify={canModify} />
					</div>
				</div>

				<div className="container page">
					<div className="row article-content">
						<div className="col-xs-12">
							<div dangerouslySetInnerHTML={markup}></div>

							<ul className="tag-list">
								{article.tagList.map(tag => {
									return (
										<li key={tag} className="tag-default tag-pill tag-outline">
											{tag}
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					<hr />

					<div className="article-actions"></div>

					<div className="row">
						<CommentContainer
							comments={comments || []}
							errors={commentErrors}
							slug={params.id}
							currentUser={currentUser}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
