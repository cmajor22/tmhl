import { server } from "../endpoint";

export async function getScheduleGames(league, season) {
  return new Promise((resolve) => {
    fetch(`${server}/schedule/games`, {
      method: 'GET',
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
