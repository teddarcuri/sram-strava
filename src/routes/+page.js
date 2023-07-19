import { authStore } from '$lib/stores/auth';
import { getActivities } from '$lib/services/strava/activities';
import { get } from 'svelte/store';

export async function load() {
	if (get(authStore).strava.access_token) {
		const activities = await getActivities(get(authStore).strava.access_token);
		return {
			activities
		};
	}

	return null;
}
