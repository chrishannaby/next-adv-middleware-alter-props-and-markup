import { useState } from 'react';
import { useRouter } from 'next/router';

const Page = ({ prices, unit, slug }) => {
	const router = useRouter();
	const [test, setTest] = useState(false);
	console.log({ prices, unit, slug, router: router.query });
	return (
		<div>
			<h1 id="message">SSG page with middleware: {slug}</h1>
			<p>
				Price:{' '}
				<span
					id="price"
					data-prices={encodeURIComponent(JSON.stringify(prices))}
				>
					{prices[unit]}
				</span>
			</p>
			<button onClick={() => setTest(!test)}>Click me</button>
			<p>{test}</p>
		</div>
	);
};

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { slug: 'a' } },
			{ params: { slug: 'b' } },
			{ params: { slug: 'c' } },
		],
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params }) {
	const { slug } = params;
	return {
		props: {
			slug,
			prices: {
				yard: 3,
				foot: 1,
			},
			unit: 'yard',
		},
	};
}

export default Page;
