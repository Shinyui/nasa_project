const base_url = "http://localhost:8000/v1"

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const resp = await fetch(`${base_url}/planets`);
  return await resp.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const resp = await fetch(`${base_url}/launches`);
  const fetchedLaunches = await resp.json();
  return fetchedLaunches.sort((a, b) => { return a.flightNumber - b.flightNumber});
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {    
    return await fetch(`${base_url}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),
    })
  } catch (error) {
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {    
    return await fetch(`${base_url}/launches/${id}`, {
      method: "delete"
    })
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};