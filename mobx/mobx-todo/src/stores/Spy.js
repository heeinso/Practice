import { spy } from 'mobx';
import React from 'react';
import { Typography } from '@material-ui/core';

import { asComponent } from '../utils/asComponent';

export const Spy = asComponent(() => {
	const disposer = spy(event => console.log(event));

	setTimeout(disposer, 5000);

	return (
		<Typography>
			Switch to a different example to see some spy activity
		</Typography>
	);
});
