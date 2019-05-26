import * as React from 'react';
import { Switch } from 'antd';

interface ToggleProps {
	label: string;
	turnOn: () => void;
	turnOff: () => void;
}

export const Toggle: React.FC<ToggleProps> = props => {
	return (
		<Switch
			style={{
				marginLeft: 10,
			}}
			checkedChildren={props.label}
			unCheckedChildren={props.label}
			onChange={checked => {
				if (checked) {
					props.turnOn();
				} else {
					props.turnOff();
				}
			}}
		/>
	);
};
