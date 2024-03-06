import { deal, newPoker } from '$lib/poker/poker';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const poker = newPoker();
	deal(poker);
	// const deck = newDeck();

	return {
		post: {
			poker
		}
	};
};
