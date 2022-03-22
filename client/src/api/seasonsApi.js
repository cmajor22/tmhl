import { server } from "../endpoint";

export async function getSeasons(league = 1) {
  return new Promise((resolve) => {
    fetch(`${server}/seasons`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({league: league})})
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