import React from 'react';

const useInputValue = initialValue => {
	const [value, setValue] = React.useState(initialValue);

	return {
		value,
		onChange: e => setValue(e.target.value),
		resetValue: () => setValue(''),
	};
};

export default ({ onSubmit }) => {
	const { resetValue, ...text } = useInputValue('');

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				onSubmit(text.value);
				resetValue();
			}}>
			<input {...text} />
		</form>
	);
};
