import { server } from "../endpoint";

export async function getGameData(gamesId) {
  return new Promise((resolve) => {
    fetch(`${server}/games`, {
      method: 'PUT',
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

export async function getGameGoals(gameId) {
  return new Promise((resolve) => {
    fetch(`${server}/game/goals`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({gameId: gameId})})
      .then(res => res.json())
      .then((result) => {
          resolve(result);
        },
        (error) => {
          resolve([]);
        }
      )
  });
}

export async function getGamePenalties(gameId) {
  return new Promise((resolve) => {
    fetch(`${server}/game/penalties`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({gameId: gameId})})
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

export async function getGameHome(gameId) {
  return new Promise((resolve) => {
    fetch(`${server}/game/home`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({gameId: gameId})})
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

export async function getGameAway(gameId) {
  return new Promise((resolve) => {
    fetch(`${server}/game/away`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({gameId: gameId})})
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
