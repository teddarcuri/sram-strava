# 👋🚴 Team SRAM

First of all, thank you for the opportunity to do such a fun, engaging code challenge.
I learned a couple of things throughout this process - I hope you enjoy the end product.

Of course there are a myriad of things I'd like to attend to and improve over time, but overall I am pleased. Look forward to discussing further what can be improved, why I did what I did, and to simply nerd out on the details.

### What I built

A 3d globe that displays a user's recent Strava activities.
I took around 4 hours to complete this challenge.
But, as you may have seen, I have a similar project made already, so I was able to leverage some of that code.

![screenshot](https://github.com/teddarcuri/sram-strava/blob/main/src/lib/assets/screen.png?raw=true)

I chose to build this using SvelteKit and Mapbox. As requested, this application completes a simple OAuth exchange with Strava. It then displays a 3d globe with the user's recent activities (limited to 20 so as to not risk exceeding the daily throttle).

The interesting bit is you can click the routes on the map to set as the `activeActivity` and this will reflect in the sidebar UI. Vice versa, click the 'focus' icon on an activity in the sidebar and the map will update accordingly. This two way interaction could be a very powerful way to allow
our users to interact with their recent rides if paired with data from their AXS account.

Sveltekit provides routing, SSR, state managment, transitions, and much more right out of the box. Svelte stores are a powerful state managment mechanism built into the framework. The routing is powerful and provides structure. Happy to discuss how this application might scale in complexity and how SvelteKit would help.

## Installation

Create an .env.local file with the following variables.
Only sharing here since this is a private repo and a non-user facing product.
Obviously these env vars would be kept secret in a production environment.

```
# Strava
VITE_STRAVA_CLIENT_ID=110758
VITE_STRAVA_CLIENT_SECRET=4e8b0e59e95b3b5c495806dadf0e4ccae8a8e39b

# Mapbox
PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoic2F5c3RoZXRlZGQiLCJhIjoiY2xrYWdhNWRyMDY2djNkbzQ0MXI3cXo5YiJ9.RzKCCxXw5ryQNyGBGEhYFA
```

Then install packages via npm and run the dev server.

```bash
npm install
npm run dev
```

#### Things I'd improve over time/didn't get to in the time limit

- [ ] Minor css issues (sidebar doesn't scroll all the way)
- [ ] Strava API Refresh token flow
- [ ] Strava API error handling
- [ ] Strava API pagination
- [ ] Strava API activity type filtering
- [ ] Activity Search
- [ ] Unit testing
- [ ] "Feature" based folder architecture
- [ ] Mobile considerations
