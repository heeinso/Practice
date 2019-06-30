import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

const Banner = ({ appName }) => (
	<Jumbotron>
		<Grid>
			<Row>
				<Col xs={12}>
					<h1>{appName.toLowerCase()}</h1>
					<p>CRA + Mobx + Cognito = ❤️</p>
				</Col>
			</Row>
		</Grid>
	</Jumbotron>
);

export default Banner;
