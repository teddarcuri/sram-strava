import { authStore } from '$lib/stores/auth';
import { get } from 'svelte/store';

const PAGE_LIMIT = 20;

export async function getActivities() {
	const strava_access_token = get(authStore).strava.access_token;
	const response = await fetch(
		`https://www.strava.com/api/v3/athlete/activities?access_token=${strava_access_token}&per_page=${PAGE_LIMIT}`
	);
	const activities = await response.json();

	return activities;
}
