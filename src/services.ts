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
      currentTurn: firstTurn, // Base this on the words
    };

    return game;
  }

  static makeMove(game: Game, guess: Guess): Game {
    const guessedWord = game.words.find(word => {
      return word.value === guess.word.value;
    });
    console.log("guessedWord", guessedWord);
    if (guessedWord == undefined) {
      throw Error("Could not find guessed word.");
    }

    if (game.guesses.find(aGuess => aGuess.word.value === guessedWord.value)) {
      throw Error("That word has already been guessed.");
    }

    let guessIsCorrect =
      (guessedWord.faction === "redAgent" && game.currentTurn === "red") ||
      (guessedWord.faction === "blueAgent" && game.currentTurn === "blue");
    // TODO game over when no more selections for a team
    // TODO game over when assassin

    const currentTurn = (guessIsCorrect
      ? game.currentTurn
      : game.currentTurn == "red"
      ? "blue"
      : "red") as Team;

    const updatedGame = {
      ...game,
      guesses: [...game.guesses, guess],
      currentTurn: currentTurn,
    };
    return updatedGame;
  }

  static reset(game: Game, wordsList: string): Game {
    return GameService.create(game.code, wordsList);
  }
}

export { GameService };
