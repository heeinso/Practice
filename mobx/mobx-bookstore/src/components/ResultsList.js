import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { EmptyResult } from './EmptyResult';
import { BookItem } from './BookItem';

@inject(({ store }) => ({ searchStore: store }))
@observer
class ResultsList extends React.Component {
	render() {
		const { searchStore, style } = this.props;
		const { isEmpty, results, totalCount, status } = searchStore;

		return (
			<Grid spacing={16} container style={style}>
				{isEmpty && status === 'completed' ? (
					<Grid item xs={12}>
						<EmptyResult />
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

				{results.map(result => (
					<Grid item xs={12} key={result.id}>
						<BookItem book={result} />
						<Divider />
					</Grid>
				))}
			</Grid>
		);
	}
}

export default ResultsList;
