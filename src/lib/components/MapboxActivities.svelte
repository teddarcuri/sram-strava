<script>
	import { getContext, onMount, afterUpdate } from 'svelte';
	import { activitiesStore } from '$lib/stores/activities';
	import polyline from '@mapbox/polyline';

	export let activeActivity;

	const { getMap } = getContext('map');
	const activities = $activitiesStore.activities;
	$: activeActivityId = activeActivity?.id ?? null;

	const map = getMap();
	const mapCanvas = map.getCanvas();

	const coordinates = [];

	function updateLines() {
		activities.forEach((activity) => {
			if (!activity.map) return;
			const activityId = `activity-${activity.id.toString()}`;
			const isActive = activeActivityId === activity.id;
			const lineLayer = map.getLayer(activityId);

			console.log(isActive ? activity.name : 'nah');

			if (lineLayer) {
				map.setPaintProperty(activityId, 'line-opacity', isActive ? 1 : 0.5);
				map.setPaintProperty(activityId, 'line-width', isActive ? 10 : 4);
			} else {
				const geometry = polyline.toGeoJSON(activity.map.summary_polyline);
				const line = {
					type: 'Feature',
					geometry,
					properties: {}
				};

				map.addSource(activityId, {
					type: 'geojson',
					lineMetrics: true,
					data: line
				});

				map.addLayer({
					id: activityId,
					type: 'line',
					source: activityId,
					layout: {
						'line-join': 'round',
						'line-cap': 'round'
					},
					paint: {
						'line-color': '#F7455D',
						'line-opacity': isActive ? 1 : 0.5,
						'line-gradient': [
							'interpolate',
							['linear'],
							['line-progress'],
							0,
							'#F8404E',
							0.3,
							'#FF838D',
							0.7,
							'#C20920',
							1,
							'#E51938'
						],
						'line-width': isActive ? 10 : 4
					}
				});

				coordinates.push(...geometry.coordinates);
			}

			map.on('click', activityId, () => {
				console.log(activity);
				activitiesStore.update((s) => ({
					...s,
					activeActivity: activity
				}));
			});

			map.on('mouseenter', activityId, () => {
				mapCanvas.style.cursor = 'pointer';
				map.setPaintProperty(activityId, 'line-width', 12);
				map.setPaintProperty(activityId, 'line-opacity', isActive ? 1 : 0.7);
			});

			map.on('mouseleave', activityId, () => {
				mapCanvas.style.cursor = '';
				map.setPaintProperty(activityId, 'line-width', isActive ? 10 : 4);
				map.setPaintProperty(activityId, 'line-opacity', isActive ? 1 : 0.5);
			});
		});
	}

	onMount(() => {
		updateLines();
	});

	afterUpdate(() => {
		updateLines();
	});

	$: {
		if (activeActivity) {
			map.flyTo({
				center: [activeActivity.start_latlng[1], activeActivity.start_latlng[0]],
				zoom: 12,
				speed: 1.5,
				curve: 1
			});
			updateLines();
		}
	}
</script>
