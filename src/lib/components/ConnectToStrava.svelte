<script>
	import StravaBtn from '$lib/assets/btn_strava_connectwith_orange.svg';
	import { getStravaAuthUrl } from '$lib/services/strava/auth';
</script>

<section>
	<p>
		<b>Welcome!</b>
		<br />
		<br />
		<i
			>This is a great place to explore your most recent rides, trail runs or anything else you've
			gotten into lately!
		</i>
		<br />
	</p>
	<br />
	<a href={getStravaAuthUrl()}>
		<img src={StravaBtn} />
	</a>
</section>

<style>
	section {
		height: 100%;
		padding: 50px;
		display: flex;
		background: #fff;
		align-items: center;
		justify-content: center;
		flex-flow: column nowrap;
	}

	button {
		background: var(--strava-orange);
		padding: 10px 30px;
		border: 0;
		outline: 0;
		color: #fff;
	}
</style>
