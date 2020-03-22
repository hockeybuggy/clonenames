import { Game, Guess, Word, Team } from "./types";

function randomChoice<T>(choices: Array<T>): T {
  // Returns a random element from within the given choices
  return choices[Math.round(Math.random() * (choices.length - 1))];
}

function randomBool(): boolean {
  return Math.random() > 0.5;
}

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
  // TODO shuffle words
  return [...redWords, ...blueWords, ...assassinWords, ...bystanderWords];
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
    const updatedGame = {
      ...game,
      guesses: [...game.guesses, guess],
      currentTurn: (game.currentTurn == "red" ? "blue" : "red") as Team,
    };
    return updatedGame;
  }
}

export { GameService };
