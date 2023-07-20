<script>
	import { getContext } from 'svelte';
	import { activitiesStore } from '$lib/stores/activities';
	import polyline from '@mapbox/polyline';

	const { getMap } = getContext('map');
	const activities = $activitiesStore.activities;

	const map = getMap();
	const mapCanvas = map.getCanvas();

	const coordinates = [];

	activities.forEach((activity) => {
		if (!activity.map) return;
		if (map.getSource(activity.id)) return;

		const geometry = polyline.toGeoJSON(activity.map.summary_polyline);
		const activityId = `activity-${activity.id.toString()}`;
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
				'line-width': 4
			}
		});

		map.on('mouseover', activityId, () => {
			console.log(activity);
		});

		map.on('mouseenter', activityId, () => {
			mapCanvas.style.cursor = 'pointer';
			map.setPaintProperty(activityId, 'line-width', 18);
		});

		map.on('mouseleave', activityId, () => {
			mapCanvas.style.cursor = '';
			map.setPaintProperty(activityId, 'line-width', 4);
		});

		coordinates.push(...geometry.coordinates);
	});
</script>
