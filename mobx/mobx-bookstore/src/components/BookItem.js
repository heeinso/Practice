import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

export const BookItem = ({ book }) => (
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
