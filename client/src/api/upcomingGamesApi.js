import { server } from "../endpoint";

export async function getUpcomingGames() {
  return new Promise((resolve) => {
    fetch(`${server}/upcomingGames/getUpcomingGames`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})})
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