<script>
	import { authStore } from '$lib/stores/auth';
	import ConnectToStrava from '$lib/components/ConnectToStrava.svelte';

	$: hasAuthToken = $authStore.strava.access_token;
</script>

<div>
	{#if hasAuthToken}
		<p>Logged in!</p>
	{:else}
		<ConnectToStrava />
	{/if}
</div>
