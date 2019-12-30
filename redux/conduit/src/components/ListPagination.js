import React from 'react';

import agent from '../agent';

const ListPagination = ({ articlesCount, currentPage, onSetPage }) => {
	if (articlesCount <= 10) {
		return null;
	}

	const range = [];
	for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
		range.push(i);
	}

	const setPage = page => onSetPage(page);

	return (
		<nav>
			<ul className="pagination">
				{range.map(v => {
					const isCurrent = v === currentPage;
					const onClick = e => {
						e.preventDefault();
						setPage(v);
					};
					return (
						<li
							key={v.toString()}
							className={isCurrent ? 'page-item active' : 'page-item'}
							onClick={onClick}>
							<a className="page-link" href="">
								{v + 1}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default ListPagination;
