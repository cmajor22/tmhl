import { server } from "../endpoint";

export async function getRosters19(league = 1, year = "2019-2020") {
  return new Promise((resolve) => {
    fetch(`${server}/rosters`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({league: league, year: year})})
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

export async function getRosters40(league = 2, year = "2019-2020") {
  return new Promise((resolve) => {
    fetch(`${server}/rosters`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({league: league, year: year})})
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

export async function getRostersCaptains() {
  return new Promise((resolve) => {
    fetch(`${server}/rosters/captains`, {
      method: 'GET',
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