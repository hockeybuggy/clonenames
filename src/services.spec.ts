import { GameService } from "./services";
import { Faction } from "./types";
import { DEFAULT_WORD_LIST } from "./constants";

describe("GameService", () => {
  describe("create", () => {
    it("generates a game with the given code", () => {
      const game = GameService.create("gcode", DEFAULT_WORD_LIST);

      expect(game.code).toEqual("gcode");
    });

    it("generates a game with 25 unique words", () => {
      const game = GameService.create("gcode", DEFAULT_WORD_LIST);

      const allWords: object = game.words.reduce((accum, current) => {
        (accum as any)[current.value] = 1;
        return accum;
      }, {});
      const uniqueWords = Object.keys(allWords).length;

      expect(uniqueWords).toEqual(25);
    });

    it("generates the right number of factions", () => {
      const game = GameService.create("gcode", DEFAULT_WORD_LIST);

      const factionCount: object = game.words.reduce((accum, current) => {
        (accum as any)[current.faction] =
          ((accum as any)[current.faction] || 0) + 1;
        return accum;
      }, {});

      const redAgent = (factionCount as any)["redAgent"] as number;
      const blueAgent = (factionCount as any)["blueAgent"] as number;
      if (redAgent > blueAgent) {
        expect(redAgent).toEqual(9);
        expect(blueAgent).toEqual(8);
      } else {
        expect(blueAgent).toEqual(9);
        expect(redAgent).toEqual(8);
      }

      const assassin = (factionCount as any)["assassin"] as number;
      expect(assassin).toEqual(1);
      const bystander = (factionCount as any)["bystander"] as number;
      expect(bystander).toEqual(7);
    });

    it.todo("throws an error when given a word list too short");
  });

  describe("makeMove", () => {
    it("flips the turn to the other team", () => {
      const game = GameService.create("gcode", DEFAULT_WORD_LIST);
      const guess = {
        word: { value: "GOOSE", faction: "redAgent" as Faction },
      };

      // TODO this isn't correct. It should only flip turns if the guess was in correct
      const newGame = GameService.makeMove(game, guess);

      expect(game.code).toEqual("gcode");
      if (game.currentTurn == "red") {
        expect(newGame.currentTurn).toEqual("blue");
      } else {
        expect(newGame.currentTurn).toEqual("red");
      }
    });

    it("adds the guess to the game's list of guesses", () => {
      const game = GameService.create("gcode", DEFAULT_WORD_LIST);
      const guess = {
        word: { value: "SALMON", faction: "blueAgent" as Faction },
      };
      expect(game.guesses).toEqual([]);

      const newGame = GameService.makeMove(game, guess);

      expect(newGame.guesses).toEqual([guess]);
    });
  });
});
