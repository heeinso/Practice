import React from 'react';

import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

const ArticleList = ({ articles, articlesCount, currentPage, onSetPage }) => {
	if (!articles) {
		return <div className="article-preview">Loading...</div>;
	}

	if (articles.length === 0) {
		return <div className="article-preview">No articles are here... yet.</div>;
	}

	return (
		<div>
			{articles.map(article => (
				<ArticlePreview key={article.slug} article={article} />
			))}
			<ListPagination
				articlesCount={articlesCount}
				currentPage={currentPage}
				onSetPage={onSetPage}
			/>
		</div>
	);
};

export default ArticleList;
