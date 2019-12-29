import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import agent from '../agent';
import ArticleList from './ArticleList';

const EditProfileSettings = ({ isUser }) => {
	return (
		isUser && (
			<Link
				to="settings"
				className="btn btn-sm btn-outline-secondary action-btn">
				<i className="ion-gear-a"></i> Edit Profile Settings
			</Link>
		)
	);
};

const FollowUserButton = ({
	isUser,
	user: { following, follow, unfollow, username },
}) => {
	if (isUser) {
		return null;
	}

	let classes = 'btn btn-sm action-btn';
	if (following) {
		classes += ' btn-secondary';
	} else {
		classes += ' btn-outline-secondary';
	}

	const handleClick = e => {
		e.preventDefault();
		if (following) {
			unfollow(username);
		} else {
			follow(username);
		}
	};

	return (
		<button className={classes} onClick={handleClick}>
			<i className="ion-plus-round"></i>
			&nbsp;
			{following ? 'Unfollow' : 'Follow'} {username}
		</button>
	);
};

const mapStateToProps = state => ({
	...state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
	onFollow: username =>
		dispatch({
			type: 'FOLLOW_USER',
			payload: agent.Profile.follow(username),
		}),
	onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
	onUnfollow: username =>
		dispatch({
			type: 'UNFOLLOW_USER',
			payload: agent.Profile.unfollow(username),
		}),
	onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
});

class Profile extends React.Component {
	componentWillMount() {
		this.props.onLoad(
			Promise.all([
				agent.Profile.get(this.props.params.username),
				agent.Articles.byAuthor(this.props.params.username),
			])
		);
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	renderTabs() {
		return (
			<ul className="nav nav-pills outline-active">
				<li className="nav-item">
					<Link
						className="nav-link active"
						to={`@${this.props.profile.username}`}>
						My Articles
					</Link>
				</li>

				<li className="nav-item">
					<Link
						className="nav-link"
						to={`@${this.props.profile.username}/favorites`}>
						Favorited Articles
					</Link>
				</li>
			</ul>
		);
	}

	render() {
		const { profile, currentUser, onFollow, onUnfollow, articles } = this.props;
		if (!profile) {
			return null;
		}

		const isUser = currentUser && profile.username === currentUser.username;

		return (
			<div className="profile-page">
				<div className="user-info">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-10 offset-md-1">
								<img src={profile.image} className="user-img" />
								<h4>{profile.username}</h4>
								<p>{profile.bio}</p>

								<EditProfileSettings isUser={isUser} />
								<FollowUserButton
									isUser={isUser}
									user={profile}
									follow={onFollow}
									unfollow={onUnfollow}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-10 offset-md-1">
							<div className="articles-toggle">{this.renderTabs()}</div>

							<ArticleList articles={articles} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export { Profile, mapStateToProps };
