import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import BasicPage from '../Common/BasicPage';
import ListErrors from '../Common/ListErrors';

@inject('authStore')
@withRouter
@observer
class Confirm extends React.Component {
	handleCodeChange = e => this.props.authStore.setCode(e.target.value);
	handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
	handleSubmitForm = e => {
		e.preventDefault();
		this.props.authStore
			.confirmCode()
			.then(() => this.props.history.replace('/login'));
	};

	render() {
		const { values, errors, inProgress } = this.props.authStore;

		return (
			<BasicPage title="Confirm code">
				<p>Check your email for a confirmation code.</p>

				<ListErrors errors={errors} />

				<form onSubmit={this.handleSubmitForm}>
					<FormGroup>
						<FormControl
							type="email"
							placeholder="Email"
							value={values.email}
							onChange={this.handleEmailChange}
						/>
					</FormGroup>
					<FormGroup>
						<FormControl
							type="text"
							placeholder="Code"
							onChange={this.handleCodeChange}
						/>
					</FormGroup>

					<Button
						bsSize="large"
						bsStyle="primary"
						type="submit"
						disabled={inProgress}>
						Confirm
					</Button>
				</form>
			</BasicPage>
		);
	}
}

export default Confirm;
