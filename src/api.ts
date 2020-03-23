import { Game, GameCode, Timestamp } from "./types";

class API {
  static createGame = async (game: Game) => {
    // TODO error handling
    console.log(game);
    const response = await fetch("/.netlify/functions/game-create", {
      body: JSON.stringify(game),
      method: "POST",
    });
    const response_json = await response.json();
    return {
      ts: response_json.ts,
      game: response_json.data,
      error: response_json.error,
    };
  };

  static loadGame = async (
    code: GameCode
  ): Promise<{ ts: Timestamp; game: Game }> => {
    // TODO error handling
    const response = await fetch(`/.netlify/functions/game-load/${code}`, {
      method: "GET",
    });
    const response_json = await response.json();
    return {
      ts: response_json.ts,
      game: response_json.data,
    };
  };

  static updateGame = async (
    timestamp: Timestamp,
    game: Game
  ): Promise<{ ts: Timestamp; game: Game; error: { code: string } }> => {
    // TODO network error handling
    const response = await fetch(`/.netlify/functions/game-update`, {
      method: "PUT",
      body: JSON.stringify({ timestamp, game }),
    });
    const response_json = await response.json();
    return {
      ts: response_json.ts,
      game: response_json.data,
      error: response_json.error,
    };
  };
}

export default API;
