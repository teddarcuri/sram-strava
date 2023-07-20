<script>
	import { onMount, setContext } from 'svelte';
	import { activitiesStore } from '$lib/stores/activities';
	import bootstrapMapbox from '$lib/utils/bootstrapMapbox';
	import MapboxActivities from './MapboxActivities.svelte';

	let map;

	$: activites = $activitiesStore.activities;

	onMount(async () => {
		map = await bootstrapMapbox();
	}); // Setup mapbox-gl

	$: setContext('map', { getMap: () => map }); // Provide map context - getMap is used instead of map because map is undefined onMount
</script>

<div id="map" />
{#if map && activites.length}
	<MapboxActivities />
{/if}

<style>
	#map {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		left: 0;
		z-index: 2;
	}
</style>
