import { writable } from 'svelte/store';

const initialState = {
	activities: [],
	activeActivity: null
};

export const resetActivitiesStore = (store) => {
	store.set(initialState);
};

export const activitiesStore = writable({
	...initialState
});

export default activitiesStore;
