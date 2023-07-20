import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';

export default async () => {
	const module = await import('mapbox-gl/dist/mapbox-gl.js');
	const mapboxgl = module.default;
	mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;

	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/satellite-streets-v11',
		projection: 'globe',
		zoom: 3.6,
		bearing: 0,
		center: [-99.94373365867199, 43.495094628394924],
		pitch: 45
	});

	map.on('styledata', () => {
		// create DEM source
		if (!map.getSource('mapbox-dem')) {
			// https://en.wikipedia.org/wiki/Digital_elevation_model
			map.addSource('mapbox-dem', {
				type: 'raster-dem',
				url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
				tileSize: 512,
				maxzoom: 14
			});
			// Set Terrain
			map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });
		}

		// Draw Atmosphere on render
		map.on('render', () => {
			//
			// Update atmosphere
			// Show sky when user is low enough
			const HORIZON_BLEND_LOW = 0.0333;
			const HORIZON_BLEND_HIGH = 1;
			const fog = map.getFog();
			const zoom = map.getZoom();
			// If the user is zoomed in enough, set the fog to ressemble an atmosphere
			if (zoom < 5.5) {
				if (fog?.['horizon-blend'] !== HORIZON_BLEND_LOW) {
					map.setFog({
						color: 'rgba(186, 210, 235, 1)', // Lower atmosphere
						'high-color': 'rgba(36, 92, 223, 1)', // Upper atmosphere
						'horizon-blend': HORIZON_BLEND_LOW, // Atmosphere thickness (default 0.2 at low zooms)
						'space-color': 'rgb(0, 0, 0)', // Background color
						'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
					});
				}
			} else {
				// If the user is zoomed out enough, set the fog to ressemble space
				if (fog?.['horizon-blend'] !== HORIZON_BLEND_HIGH) {
					map.setFog({
						color: 'rgba(186, 210, 235, 1)', // Lower atmosphere
						'high-color': 'rgba(36, 92, 223, 1)', // Upper atmosphere
						'horizon-blend': HORIZON_BLEND_HIGH, // Atmosphere thickness (default 0.2 at low zooms)
						'space-color': 'rgb(0, 0, 0)', // Background color
						'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
					});
				}
			}
		});
	});

	return map;
};
