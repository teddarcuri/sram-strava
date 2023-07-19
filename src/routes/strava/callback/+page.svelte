<script>
	import { onMount } from 'svelte';
	import { handleAuthRedirect } from '$lib/services/strava/auth';

	onMount(() => {
		handleAuthRedirect();
	});
</script>

<div>
	<h1>Authenticating with Strava</h1>
</div>

<style>
	div {
		padding: 50px;
		font-size: 0.8em;
		color: #aaa;
	}
</style>
