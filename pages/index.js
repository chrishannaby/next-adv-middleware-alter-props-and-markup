const Page = ({ prices, unit }) => {
	const [test, setTest] = useState(false);
	return (
		<div>
			<h1 id="message">SSG page with middleware</h1>
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

export async function getStaticProps() {
	return {
		props: {
			prices: {
				yard: 3,
				foot: 1,
			},
			unit: 'yard',
		},
	};
}

export default Page;
