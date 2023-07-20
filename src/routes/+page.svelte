<script>
	import { authStore } from '$lib/stores/auth';
	import { activitiesStore } from '$lib/stores/activities';
	import ConnectToStrava from '$lib/components/ConnectToStrava.svelte';
	import ActivityList from '$lib/components/ActivityList.svelte';
	export let data;

	$: hasAuthToken = $authStore.strava.access_token;
	$: activeActivity = $activitiesStore.activeActivity;
</script>

<section>
	{#if hasAuthToken}
		<ActivityList activities={data.activities} {activeActivity} />
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
