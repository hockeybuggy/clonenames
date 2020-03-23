export type Timestamp = number;

export type GameCode = string;

export type Team = "red" | "blue";
export type Faction = "redAgent" | "blueAgent" | "bystander" | "assassin";
export type PlayerView = "codeMaster" | "player";

export interface Guess {
  word: Word;
}

export interface Word {
  value: string;
  faction: Faction;
}

export interface Game {
  code: GameCode;
  words: Array<Word>;
  guesses: Array<Guess>;
  currentTurn: Team;
  winner: Team | "NONE";
}
