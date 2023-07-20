<script>
	import mpsToMph from '$lib/utils/mpsToMph';
	import metersToMiles from '$lib/utils/metersToMiles';
	import secondsToHours from '$lib/utils/secondsToHours';

	export let activities;
</script>

<section>
	{#if activities.length === 0}
		<p>No activities found</p>
	{:else}
		{#each activities as activity}
			<div class="activity">
				<h2>{activity.name}</h2>
				<h5>{activity.type}</h5>
				<!-- <pre>{JSON.stringify(activity, null, 2)}</pre> -->
				<div class="three-col">
					<div class="col">
						<h3>Total Time</h3>
						<p>{secondsToHours(activity.elapsed_time)} hours</p>
					</div>
					<div class="col">
						<h3>Max Speed</h3>
						<p>{mpsToMph(activity.max_speed)} mph</p>
					</div>
					<div class="col">
						<h3>Distance</h3>
						<p>{metersToMiles(activity.distance)} miles</p>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</section>

<style>
	h2 {
		margin-bottom: 5px;
	}

	h5 {
		color: #999;
		margin-bottom: 10px;
	}

	section {
		height: 100%;
		flex: 1 1 100%;
	}

	.three-col {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-top: solid 1px #eee;
		padding-top: 10px;
	}

	.activity {
		margin: 15px;
		background: #fff;
		padding: 10px;
		font-size: 12px;
		border: solid 1px #eee;
		box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.5);
	}
</style>
