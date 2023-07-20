<script>
	import { onMount, setContext } from 'svelte';
	import bootstrapMapbox from '$lib/utils/bootstrapMapbox';

	let map;

	onMount(async () => {
		map = await bootstrapMapbox();
	}); // Setup mapbox-gl

	$: setContext('map', { getMap: () => map }); // Provide map context - getMap is used instead of map because map is undefined onMount
</script>

<div id="map" />

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
