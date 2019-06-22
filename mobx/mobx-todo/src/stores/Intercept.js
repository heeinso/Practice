import { intercept, observable } from 'mobx';
import { asComponent } from '../utils/asComponent';

export const InterceptExample = asComponent(() => {
	const theme = observable({
		color: 'light',
		shades: [],
	});

	const disposer = intercept(theme, 'color', change => {
		console.log('Intercepting:', change);

		if (!change.newValue) {
			return null;
		}

		const newTheme = change.newValue.toLowerCase();
		if (newTheme === 'l' || newTheme === 'd') {
			change.newValue = newTheme === 'l' ? 'light' : 'dark';
			return change;
		}

		const allowedThemes = ['light', 'dark'];
		const isAllowed = allowedThemes.includes(newTheme);
		if (!isAllowed) {
			throw new Error(`${change.newValue} is not a valid theme`);
		}

		return change;
	});

	theme.color = 'dark';
	theme.color = 'l';
	theme.color = undefined;
});
