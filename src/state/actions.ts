import { Timestamp, Word, Game, GameCode, PlayerView, Team } from "./../types";

export enum GameActions {
  LoadGame = "LoadGame",
  FetchGameLoading = "FetchGameLoading",
  FetchGameComplete = "FetchGameComplete",
  CreateGame = "CreateGame",
  CreateGameLoading = "CreateGameLoading",
  CreateGameComplete = "CreateGameComplete",
  UpdateGame = "UpdateGame",
  UpdateGameLoading = "UpdateGameLoading",
  UpdateGameComplete = "UpdateGameComplete",
  NewGame = "NewGame",
}

export enum UIActions {
  SelectWord = "SelectWord",
  EndTurn = "EndTurn",
  ChangePlayerView = "ChangePlayerView",
  NextGame = "NextGame",
  UpdateGameCodeInput = "UpdateGameCodeInput",
  UpdateWordsListInput = "UpdateWordsListInput",
}

export type ActionTypes =
  | { type: GameActions.LoadGame; gameCode: GameCode }
  | { type: GameActions.CreateGame }
  | { type: GameActions.CreateGameLoading }
  | { type: GameActions.CreateGameComplete }
  | { type: GameActions.UpdateGame; ts: Timestamp; game: Game }
  | { type: GameActions.UpdateGameLoading }
  | { type: GameActions.UpdateGameComplete; ts: Timestamp; game: Game }
  // TODO make create game preload the game state before redirecting
  // | { type: GameActions.CreateGameComplete; ts: number; game: Game }
  | { type: GameActions.FetchGameLoading }
  | { type: GameActions.FetchGameComplete; ts: Timestamp; game: Game }
  | { type: UIActions.UpdateGameCodeInput; value: string }
  | { type: UIActions.UpdateWordsListInput; value: string }
  | { type: UIActions.SelectWord; word: Word }
  | { type: UIActions.ChangePlayerView; view: PlayerView }
  | { type: UIActions.EndTurn; team: Team };
