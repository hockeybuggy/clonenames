import { Game, Guess, Word, Team } from "./types";

function randomChoice<T>(choices: Array<T>): T {
  // Returns a random element from within the given choices
  return choices[Math.round(Math.random() * (choices.length - 1))];
}

function randomBool(): boolean {
  return Math.random() > 0.5;
}

class GameService {
  static create(gameCode: string, wordsList: string): Game {
    const wordsSplit = wordsList.split(",").map(word => word.trim());
    const firstTurn: Team = randomBool() ? "red" : "blue";

    console.log(wordsSplit);
    // TODO there is a potential issue where words could be duplicated
    const redWords: Array<Word> = Array.from(
      Array(firstTurn == "red" ? 9 : 8).keys()
    ).map(() => {
      return { value: randomChoice(wordsSplit), faction: "redAgent" };
    });
    const blueWords: Array<Word> = Array.from(
      Array(firstTurn == "blue" ? 9 : 8).keys()
    ).map(() => {
      return { value: randomChoice(wordsSplit), faction: "blueAgent" };
    });
    const assassinWords: Array<Word> = Array.from(Array(1).keys()).map(() => {
      return { value: randomChoice(wordsSplit), faction: "assassin" };
    });
    const bystanderWords: Array<Word> = Array.from(Array(7).keys()).map(() => {
      return { value: randomChoice(wordsSplit), faction: "bystander" };
    });
    // TODO shuffle words

    const game = {
      code: gameCode,
      words: [...redWords, ...blueWords, ...assassinWords, ...bystanderWords],
      guesses: [] as Array<Guess>,
      currentTurn: firstTurn, // Base this on the words
    };
    return game;
  }
}

export { GameService };
