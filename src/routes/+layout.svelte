<script>
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import { authStore } from '$lib/stores/auth';
	import logo from '$lib/assets/logo.png';
	import background from '$lib/assets/eagle-bg-horizon.png';
	import Mapbox from '$lib/components/Mapbox.svelte';

	const title = '+Strava';

	$: hasAuthToken = $authStore.strava.access_token;
</script>

<main id="app-wrapper">
	<aside id="sidebar">
		<header>
			<a href="/">
				<img id="logo" src={logo} alt="logo" />
				<span>{title}</span>
			</a>
		</header>
		<slot />
	</aside>
	<section id="map-wrapper">
		{#if hasAuthToken}
			<Mapbox />
		{/if}
		<img src={background} id="map-bg" />
	</section>
</main>

<style>
	#app-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
	}

	aside#sidebar {
		background: #fafafa;
		height: 100%;
		flex: 0 0 333px;
		z-index: 1;
		box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
	}

	#sidebar header {
		height: 60px;
		flex: 0 0 60px;
		padding: 0px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	#sidebar header span {
		text-transform: uppercase;
		letter-spacing: 4px;
		font-weight: 400;
		margin-top: 4px;
		margin-left: 10px;
		font-size: 0.7em;
	}

	#sidebar header a {
		height: 100%;
		padding: 0 20px;
		display: flex;
		align-items: center;
		width: 100%;
	}

	#logo {
		width: 120px;
	}

	#map-wrapper {
		flex: 1;
		height: 100%;
		position: relative;
	}

	#map-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}
</style>
