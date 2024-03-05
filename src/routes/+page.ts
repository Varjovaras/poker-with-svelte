import { newDeck } from '$lib/deck';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const deck = newDeck();

	return {
		post: {
			deck
		}
	};
};
