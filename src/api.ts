import { Game, GameCode, Timestamp } from "./types";

class API {
  static createGame = async (data: Game) => {
    // TODO error handling
    console.log(data);
    const response = await fetch("/.netlify/functions/game-create", {
      body: JSON.stringify(data),
      method: "POST",
    });
    console.log(response);
    return response.json();
  };

  static loadGame = async (
    code: GameCode
  ): Promise<{ ts: Timestamp; game: Game }> => {
    // TODO error handling
    console.log(code);
    const response = await fetch(`/.netlify/functions/game-load/${code}`, {
      method: "GET",
    });
    console.log(response);
    const response_json = await response.json();
    return {
      ts: response_json.ts,
      game: response_json.data,
    };
  };
}

export default API;
