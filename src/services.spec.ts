import { GameService } from "./services";
import { Team, Faction } from "./types";
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
    it("flips the turn to the other team if you select one of their words", () => {
      const game = {
        ...GameService.create("gcode", DEFAULT_WORD_LIST),
        currentTurn: "red" as Team,
      };
      const firstWord = { value: "CEDAR", faction: "blueAgent" as Faction };
      game.words[0] = firstWord;
      const guess = { word: firstWord };

      const newGame = GameService.makeMove(game, guess);

      expect(game.code).toEqual("gcode");
      expect(newGame.currentTurn).toEqual("blue");
    });

    it("does not flip the turn if you select one of your words", () => {
      const game = {
        ...GameService.create("gcode", DEFAULT_WORD_LIST),
        currentTurn: "red" as Team,
      };
      const firstWord = { value: "KOFFEE", faction: "redAgent" as Faction };
      game.words[0] = firstWord;
      const guess = { word: firstWord };

      const newGame = GameService.makeMove(game, guess);

      expect(game.code).toEqual("gcode");
      expect(newGame.currentTurn).toEqual("red");
    });

    it("adds the guess to the game's list of guesses", () => {
      const game = GameService.create("gcode", DEFAULT_WORD_LIST);
      const firstWord = { value: "Eliza Jane", faction: "redAgent" as Faction };
      game.words[0] = firstWord;
      const guess = { word: firstWord };
      expect(game.guesses).toEqual([]);

      const newGame = GameService.makeMove(game, guess);

      expect(newGame.guesses).toEqual([guess]);
    });

    describe("ending the game", () => {
      it("does not mark a winner neither team selects their last word", () => {
        const game = GameService.create("gcode", DEFAULT_WORD_LIST);
        const redWords = game.words.filter(word => word.faction === "redAgent");
        const wordToGuess = redWords.splice(0, 1)[0];
        game.guesses = [];
        const guess = { word: wordToGuess };

        expect(game.winner).toEqual("NONE");

        const newGame = GameService.makeMove(game, guess);

        expect(newGame.winner).toEqual("NONE");
      });

      it("marks red as the winner if they guess their last word", () => {
        const game = GameService.create("gcode", DEFAULT_WORD_LIST);
        const redWords = game.words.filter(word => word.faction === "redAgent");
        const mostWords = redWords.splice(1);
        const lastWordToGuess = redWords.splice(0, 1)[0];
        game.guesses = mostWords.map(word => {
          return { word: word };
        });

        const guess = { word: lastWordToGuess };

        expect(game.winner).toEqual("NONE");

        const newGame = GameService.makeMove(game, guess);

        expect(newGame.winner).toEqual("red");
      });

      it("marks blue as the winner if they guess their last word", () => {
        const game = GameService.create("gcode", DEFAULT_WORD_LIST);
        const blueWords = game.words.filter(
          word => word.faction === "blueAgent"
        );
        const mostWords = blueWords.splice(1);
        const lastWordToGuess = blueWords.splice(0, 1)[0];
        game.guesses = mostWords.map(word => {
          return { word: word };
        });

        const guess = { word: lastWordToGuess };

        expect(game.winner).toEqual("NONE");

        const newGame = GameService.makeMove(game, guess);

        expect(newGame.winner).toEqual("blue");
      });

      it("marks red as the winner if blue picks the assassin", () => {
        const game = GameService.create("gcode", DEFAULT_WORD_LIST);
        game.currentTurn = "blue" as Team;
        const assassin = game.words.filter(
          word => word.faction === "assassin"
        )[0];
        const guess = { word: assassin };

        expect(game.winner).toEqual("NONE");

        const newGame = GameService.makeMove(game, guess);

        expect(newGame.winner).toEqual("red");
      });
    });

    describe("invalid moves", () => {
      it("throws when the word does not exist", () => {
        const game = GameService.create("gcode", DEFAULT_WORD_LIST);
        const firstWord = { value: "Gus", faction: "redAgent" as Faction };
        game.words[0] = firstWord;
        const guess = {
          word: { value: "Not Gus", faction: "redAgent" as Faction },
        };
        expect(game.guesses).toEqual([]);

        expect(() => GameService.makeMove(game, guess)).toThrow(
          Error("Could not find guessed word.")
        );
      });

      it("throws when the word has already geen guessed", () => {
        // This shouldn't happen normally (since the button is disabled)
        const firstWord = { value: "Gus", faction: "redAgent" as Faction };
        const secondWord = { value: "Buck", faction: "redAgent" as Faction };
        const guess = { word: firstWord };
        const game = GameService.create("gcode", DEFAULT_WORD_LIST);
        game.words[0] = firstWord;
        game.words[1] = secondWord;
        game.guesses.push({ word: secondWord });
        game.guesses.push(guess);

        expect(game.guesses).toEqual([{ word: secondWord }, guess]);

        expect(() => GameService.makeMove(game, guess)).toThrow(
          Error("That word has already been guessed.")
        );
      });
    });
  });
});
