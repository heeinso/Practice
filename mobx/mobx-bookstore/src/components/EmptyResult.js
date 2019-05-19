import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export const EmptyResult = () => (
	<Card>
		<CardContent>
			<Typography variant={'headline'}>No Results</Typography>
		</CardContent>
	</Card>
);
