import Overdrive from 'react-overdrive';
import Link from 'next/link';

const page = ({ url }) => {
	return (
		<div>
			<div className="image-container">
				<h1>{url.query.name}!</h1>
				<Link href="/">
					<a id="link">Back</a>
				</Link>
				<Overdrive id={url.query.id}>
					<img
						className="main-image"
						src={`https://cdn.filestackcontent.com/${url.query.image}`}
					/>
				</Overdrive>
			</div>
			<style jsx>
				{`
					.image-container {
						text-align: center;
					}
					.main-image {
						box-sizing: border-box;
						background: #fff;
						width: 180px;
						height: 180px;
						border-radius: 10px;
						border: 1px solid #ccc;
						padding: 5px;
						margin: 10px auto;
					}
				`}
			</style>
		</div>
	);
};

export default page;
