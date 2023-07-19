import { writable } from 'svelte/store';

const initialState = {
	strava: {
		access_token: null,
		refresh_token: null
	}
};

export const resetAuthStore = (store) => {
	store.set(initialState);
};

export const authStore = writable({
	...initialState
});

export default authStore;
