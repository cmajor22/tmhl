import { server } from "../endpoint";

export async function getStatsTeams(season) {
  return new Promise((resolve) => {
    fetch(`${server}/stats/teams`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({season: season})})
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

export async function getStatsGoalies(isPlayoffs, season, isFinals) {
  return new Promise((resolve) => {
    fetch(`${server}/stats/goalieStats`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isPlayoffs: isPlayoffs, season: season, isFinals: isFinals})})
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

export async function getStatsPlayers(isPlayoffs, season, isFinals) {
  return new Promise((resolve) => {
    fetch(`${server}/stats/playerStats`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isPlayoffs: isPlayoffs, season: season, isFinals: isFinals})})
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
