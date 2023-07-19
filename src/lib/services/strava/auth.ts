import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/auth';
import querystring from 'querystring';

const CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
const REDIRECT_URI =
	typeof window !== 'undefined' ? `${window.location.origin}/strava/callback` : null;
const AUTH_URL = `https://www.strava.com/oauth/authorize?${querystring.stringify({
	client_id: CLIENT_ID,
	response_type: 'code',
	redirect_uri: REDIRECT_URI,
	approval_prompt: 'force',
	scope: 'activity:read_all'
})}`;

export function getStravaAuthUrl() {
	return AUTH_URL;
}

export async function exchangeCodeForToken(code: string) {
	const response = await fetch(
		`https://www.strava.com/oauth/token?${querystring.stringify({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code,
			grant_type: 'authorization_code'
		})}`,
		{
			method: 'POST'
		}
	);

	return response.json();
}

export function handleAuthRedirect() {
	const code = new URLSearchParams(window.location.search).get('code');

	if (code) {
		return exchangeCodeForToken(code).then((response) => {
			localStorage.setItem('strava_access_token', response.access_token);
			localStorage.setItem('strava_refresh_token', response.refresh_token);

			authStore.update((store) => {
				return {
					...store,
					strava: {
						access_token: response.access_token,
						refresh_token: response.refresh_token
					}
				};
			});

			goto('/');
		});
	}
}
