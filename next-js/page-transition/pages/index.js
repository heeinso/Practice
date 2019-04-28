import React from 'react';
import Overdrive from 'react-overdrive';
import Link from 'next/link';

const characters = [
	{
		id: 'bender',
		name: 'Bender',
		image: '40Wzdn4OQbi2ncxkG96z',
	},
	{
		id: 'fry',
		name: 'Fry',
		image: 'zbglqWZQAyYO5vsHqIbw',
	},
	{
		id: 'leela',
		name: 'Leela',
		image: 'klwhl9wXRIqRTGWFNoBT',
	},
	{
		id: 'zoidberg',
		name: 'Zoidberg',
		image: '6xL1j1OQDC4VLBBLieN7',
	},
];

export default class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = { characters };
	}

	shuffleCharacters = () => {
		const characters = [...this.state.characters];
		for (let i = characters.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[characters[i - 1], characters[j]] = [characters[j], characters[i - 1]];
		}
		this.setState({ characters });
	};

	render() {
		const { characters } = this.state;
		return (
			<div className="characters-container">
				<h1>Best character?</h1>

				{characters.map(character => (
					<Link
						key={character.id}
						href={`/character?id=${character.id}&name=${character.name}&image=${
							character.image
						}`}>
						<a>
							<Overdrive id={character.id}>
								<img
									className="character-image"
									src={`https://cdn.filestackcontent.com/${character.image}`}
								/>
							</Overdrive>
						</a>
					</Link>
				))}

				<p>
					<button onClick={this.shuffleCharacters}>Shuffle</button>
				</p>
				<style jsx>
					{`
						.characters-container {
							margin-top: 200px;
							text-align: center;
						}
						.characters-container > a {
							display: inline-block;
						}
						.character-image {
							box-sizing: border-box;
							background: #fff;
							width: 80px;
							height: 80px;
							border-radius: 50%;
							border: 1px solid #ccc;
							padding: 5px;
							margin: 10px;
						}
					`}
				</style>
			</div>
		);
	}
}
