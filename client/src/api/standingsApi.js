import { server } from "../endpoint";

export async function getStandingsGames(league, season, isPlayoffs, isFinals) {
  return new Promise((resolve) => {
    fetch(`${server}/standings/games`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({league: league, season: season, isPlayoffs: isPlayoffs, isFinals: isFinals})})
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          resolve([]);
        }
      )
  });
}

export async function getStandingsVs(league, season, isPlayoffs, isFinals) {
  return new Promise((resolve) => {
    fetch(`${server}/standings/vs`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({league: league, season: season, isPlayoffs: isPlayoffs, isFinals: isFinals})})
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          resolve([]);
        }
      )
  });
}

export async function getStandingsTeams(league, season) {
  return new Promise((resolve) => {
    fetch(`${server}/standings/teams`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({league: league, season: season})})
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          resolve([]);
        }
      )
  });
}
