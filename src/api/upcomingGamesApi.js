import { server } from "../endpoint";

let dummy = [
  {homeTeam: 'Team 1', homeScore: '4', awayTeam: 'Team 2', awayScore: '2'},
  {homeTeam: 'Team 3', homeScore: '4', awayTeam: 'Team 4', awayScore: '2'},
  {homeTeam: 'Team 5', homeScore: '4', awayTeam: 'Team 6', awayScore: '2'},
  {homeTeam: 'Team 5', homeScore: '4', awayTeam: 'Team 6', awayScore: '2'},
]

export async function getUpcomingGames() {
  return new Promise((resolve) => {
    fetch(`${server}/upcomingGames/getUpcomingGames`, {
      method: 'POST',
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