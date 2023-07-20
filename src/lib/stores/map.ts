import { writable } from 'svelte/store';

// Create a writable store for the map instance
export const mapStore = writable({
	map: null
});
