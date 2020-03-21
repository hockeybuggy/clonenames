import { Game } from "./types";

export const createGame = async (data: Game) => {
  // TODO error handling
  console.log(data);
  const response = await fetch("/.netlify/functions/game-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  console.log(response);
  return response.json();
};
