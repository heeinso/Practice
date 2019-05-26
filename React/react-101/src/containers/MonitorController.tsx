import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../types';
import {
	startMonitoring,
	stopMonitoring,
	showOrderTimelineChart,
	hideOrderTimelineChart,
} from '../actions';
import { PlayButton, Toggle } from '../components';

export interface MonitorControllerProps {
	monitoring: boolean;
	onStart(): void;
	onStop(): void;
	onShowOrderTimelineChart(): void;
	onHideOrderTimelineChart(): void;
}

const mapStateToProps = (state: StoreState) => ({
	monitoring: state.monitoring,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onStart: () => {
		dispatch(startMonitoring());
	},
	onStop: () => {
		dispatch(stopMonitoring());
	},
	onShowOrderTimelineChart: () => {
		dispatch(showOrderTimelineChart());
	},
	onHideOrderTimelineChart: () => {
		dispatch(hideOrderTimelineChart());
	},
});

class MonitorController extends React.PureComponent<MonitorControllerProps> {
	render() {
		return (
			<div>
				<PlayButton
					monitoring={this.props.monitoring}
					onPlay={this.props.onStart}
					onPause={this.props.onStop}
				/>
				<Toggle
					label="Chart"
					turnOn={this.props.onShowOrderTimelineChart}
					turnOff={this.props.onHideOrderTimelineChart}
				/>
			</div>
		);
	}
}

export const MonitorControllerContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MonitorController);
