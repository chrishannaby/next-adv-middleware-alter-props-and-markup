import { MiddlewareRequest } from '@netlify/next';

export async function middleware(nextRequest) {
	const pathname = nextRequest.nextUrl.pathname;
	const request = new MiddlewareRequest(nextRequest);

	if (pathname.startsWith('/static')) {
		const unit = nextRequest.nextUrl.searchParams.get('unit');
		const response = await request.next();

		// set pricing unit to query param value
		response.transformData((data) => {
			data.pageProps.unit = unit;
			return data;
		});

		// fetch prices from data attribute and update page content
		response.rewriteHTML('#price', {
			element(element) {
				const prices = JSON.parse(
					decodeURIComponent(element.getAttribute('data-prices'))
				);
				element.setInnerContent(prices[unit].toString());
			},
		});

		return response;
	}
}
