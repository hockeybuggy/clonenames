import { Game, Guess, Word, Team } from "./types";

import { randomChoice, randomBool, shuffle } from "./utils";

function randomWords(wordsList: Array<string>, firstTurn: Team): Array<Word> {
  const redWords: Array<Word> = Array.from(
    Array(firstTurn == "red" ? 9 : 8).keys()
  ).map(() => {
    return { value: randomChoice(wordsList), faction: "redAgent" };
  });
  const blueWords: Array<Word> = Array.from(
    Array(firstTurn == "blue" ? 9 : 8).keys()
  ).map(() => {
    return { value: randomChoice(wordsList), faction: "blueAgent" };
  });
  const assassinWords: Array<Word> = Array.from(Array(1).keys()).map(() => {
    return { value: randomChoice(wordsList), faction: "assassin" };
  });
  const bystanderWords: Array<Word> = Array.from(Array(7).keys()).map(() => {
    return { value: randomChoice(wordsList), faction: "bystander" };
  });
  const unshuffledWords = [
    ...redWords,
    ...blueWords,
    ...assassinWords,
    ...bystanderWords,
  ];
  return shuffle(unshuffledWords);
}

class GameService {
  static create(gameCode: string, wordsList: string): Game {
    const wordsSplit = wordsList.split(",").map(word => word.trim());
    // TODO Base this on the words
    const firstTurn: Team = randomBool() ? "red" : "blue";

    let words;
    let uniqueWords = 0;
    do {
      words = randomWords(wordsSplit, firstTurn);
      const allWords: object = words.reduce((accum, current) => {
        (accum as any)[current.value] = 1;
        return accum;
      }, {});
      uniqueWords = Object.keys(allWords).length;
    } while (uniqueWords != 25);

    const game = {
      code: gameCode,
      words: words,
      guesses: [] as Array<Guess>,
      currentTurn: firstTurn,
      winner: "NONE" as "red" | "blue" | "NONE",
    };

    return game;
  }

  static makeMove(game: Game, guess: Guess): Game {
    const guessedWord = game.words.find(word => {
      return word.value === guess.word.value;
    });
    if (guessedWord == undefined) {
      throw Error("Could not find guessed word.");
    }

    if (game.guesses.find(aGuess => aGuess.word.value === guessedWord.value)) {
      throw Error("That word has already been guessed.");
    }

    let guessIsCorrect =
      (guessedWord.faction === "redAgent" && game.currentTurn === "red") ||
      (guessedWord.faction === "blueAgent" && game.currentTurn === "blue");

    const allGuesses = [...game.guesses, guess];

    const guessedWords = allGuesses.reduce((accum, current) => {
      (accum as any)[current.word.value] = 1;
      return accum;
    }, {});

    const factionCount: object = game.words.reduce((accum, current) => {
      (accum as any)[current.faction + "-total"] =
        ((accum as any)[current.faction + "-total"] || 0) + 1;
      const wordGuessed: boolean =
        (guessedWords as any)[current.value] !== undefined;
      (accum as any)[current.faction + "-unguessed"] =
        ((accum as any)[current.faction + "-unguessed"] || 0) +
        (wordGuessed ? 0 : 1);
      return accum;
    }, {});
    const allRedWordsGuessed =
      (factionCount as any)["redAgent-unguessed"] === 0;
    const allBlueWordsGuessed =
      (factionCount as any)["blueAgent-unguessed"] === 0;

    let winner = "NONE";
    if (allRedWordsGuessed) {
      winner = "red";
    } else if (allBlueWordsGuessed) {
      winner = "blue";
    }
    const assassinWordGuessed =
      (factionCount as any)["assassin-unguessed"] === 0;

    if (assassinWordGuessed) {
      winner = game.currentTurn === "red" ? "blue" : "red";
    }

    const currentTurn = (guessIsCorrect
      ? game.currentTurn
      : game.currentTurn == "red"
      ? "blue"
      : "red") as Team;

    const updatedGame = {
      ...game,
      guesses: allGuesses,
      currentTurn: currentTurn,
      winner: winner,
    };
    return updatedGame;
  }

  static reset(game: Game, wordsList: string): Game {
    return GameService.create(game.code, wordsList);
  }
}

export { GameService };
