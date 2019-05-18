import React, { Fragment } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { SearchStatus } from './SearchStatus';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class SearchTextField extends React.Component {
	render() {
		const { store, onChange } = this.props;
		const { term } = store;

		return (
			<Fragment>
				<TextField
					placeholder={'Search Books...'}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
					}}
					fullWidth={true}
					value={term}
					onChange={onChange}
					onKeyUp={this.onKeyUp}
				/>

				<SearchStatus />
			</Fragment>
		);
	}

	onKeyUp = event => {
		if (event.keyCode !== 13) {
			return;
		}

		this.props.onEnter();
	};
}

export default SearchTextField;
