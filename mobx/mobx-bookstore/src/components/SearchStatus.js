import React, { Fragment } from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { inject, observer } from 'mobx-react';

export const SearchStatus = inject('store')(
	observer(({ store }) => {
		const { status, term } = store;

		return (
			<Fragment>
				{status === 'pending' ? <LinearProgress variant={'query'} /> : null}

				{status === 'failed' ? (
					<Typography
						variant={'subheading'}
						style={{ color: 'red', marginTop: '1rem' }}>
						{`Failed to fetch results for "${term}"`}
					</Typography>
				) : null}
			</Fragment>
		);
	})
);
