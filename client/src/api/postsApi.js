import { server } from "../endpoint";

export async function getPosts() {
  return new Promise((resolve) => {
    fetch(`${server}/posts`, {
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
