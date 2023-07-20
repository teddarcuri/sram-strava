import { authStore } from '$lib/stores/auth';
import { activitiesStore } from '$lib/stores/activities';
import { getActivities } from '$lib/services/strava/activities';
import { get } from 'svelte/store';

export async function load() {
	if (get(authStore).strava.access_token) {
		const activities = await getActivities(get(authStore).strava.access_token);

		activitiesStore.update((s) => ({
			...s,
			activities
		}));

		return {
			activities
		};
	}

	return null;
}
