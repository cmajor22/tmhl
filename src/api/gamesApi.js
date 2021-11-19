import { server } from "../endpoint";

export async function getGameData(gamesId) {
  return new Promise((resolve) => {
    fetch(`${server}/games`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({gamesId: gamesId})})
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
