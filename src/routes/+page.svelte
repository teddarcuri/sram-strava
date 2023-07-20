<script>
	import { authStore } from '$lib/stores/auth';
	import ConnectToStrava from '$lib/components/ConnectToStrava.svelte';
	import ActivityList from '$lib/components/ActivityList.svelte';

	export let data;

	$: hasAuthToken = $authStore.strava.access_token;
</script>

<section>
	{#if hasAuthToken}
		<ActivityList activities={data.activities} />
	{:else}
		<ConnectToStrava />
	{/if}
</section>

<style>
	section {
		height: 100%;
		flex: 1 1 100%;
		overflow-y: auto;
	}
</style>
