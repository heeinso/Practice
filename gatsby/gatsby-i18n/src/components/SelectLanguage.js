import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = ({ langs }) => {
	return (
		<section>
			<header
				style={{
					color: 'white',
				}}>
				<FormattedMessage id="selectLanguage" />
			</header>
			<ul>
				{
					<Link
						to={lang.link}
						key={lang.langKey}
						style={{
							color: 'white',
						}}>
						<li selected={lang.selected}>{lang.langKey}</li>
					</Link>
				}
			</ul>
		</section>
	);
};

SelectLanguage.propTypes = {
	langs: PropTypes.array,
};

export default SelectLanguage;
