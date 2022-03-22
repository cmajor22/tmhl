import { server } from "../endpoint";

export async function getSeasonsData(playersId) {
  return new Promise((resolve) => {
    fetch(`${server}/player/seasons`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({playersId})})
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

export async function getGamesData(playersId) {
  return new Promise((resolve) => {
    fetch(`${server}/player/games`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({playersId})})
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

