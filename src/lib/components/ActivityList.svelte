<script>
	export let activities;
</script>

<section>
	{#if activities.length === 0}
		<p>No activities found</p>
	{:else}
		{#each activities as activity}
			<div class="activity">
				<h2>{activity.name}</h2>
			</div>
		{/each}
	{/if}
</section>

<style>
	section {
		height: 100%;
		flex: 1 1 100%;
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
