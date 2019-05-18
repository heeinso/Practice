import React, { Fragment } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

const EmptyResults = () => {
	return (
		<Card>
			<CardContent>
				<Typography variant={'headline'}>No Results</Typography>
			</CardContent>
		</Card>
	);
};

const BookItem = ({ book }) => {
	return (
		<Card
			elevation={0}
			style={{
				flexDirection: 'row',
				display: 'flex',
				padding: '1rem',
			}}>
			<CardMedia
				src={book.image}
				component={'img'}
				style={{ height: 200, width: 'auto' }}
			/>
			<CardContent>
				<Typography variant={'headline'}>{book.title}</Typography>
				<Typography variant={'subheading'}>{book.author}</Typography>
				<Typography variant={'subheading'} style={{ color: 'darkorange' }}>
					{book.rating}★
					<span style={{ color: 'black' }}>
						<span>
							{' from '}
							<strong>{book.totalRatings}</strong> ratings.
						</span>
					</span>
				</Typography>
			</CardContent>
		</Card>
	);
};

@inject(({ store }) => ({ searchStore: store }))
@observer
export class ResultsList extends React.Component {
	render() {
		const { searchStore, style } = this.props;
		const { isEmpty, results, totalCount, status } = searchStore;

		return (
			<Grid spacing={16} container style={style}>
				{isEmpty && status === 'completed' ? (
					<Grid item xs={12}>
						<EmptyResults />
					</Grid>
				) : null}

				{!isEmpty && status === 'completed' ? (
					<Grid item xs={12}>
						<Typography>
							Showing <strong>{results.length}</strong> of {totalCount} results.
						</Typography>
						<Divider />
					</Grid>
				) : null}

				{results.map(x => (
					<Grid item xs={12} key={x.id}>
						<BookItem book={x} />
						<Divider />
					</Grid>
				))}
			</Grid>
		);
	}
}
