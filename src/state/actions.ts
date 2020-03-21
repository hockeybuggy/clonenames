import { GameCode, PlayerView, Team } from "./../types";

export enum GameActions {
  LoadGame = "LoadGame",
  CreateGame = "CreateGame",
  CreateGameLoading = "CreateGameLoading",
  CreateGameComplete = "CreateGameComplete",
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
  | { type: UIActions.UpdateGameCodeInput; value: string }
  | { type: UIActions.UpdateWordsListInput; value: string }
  | { type: UIActions.SelectWord; word: string }
  | { type: UIActions.ChangePlayerView; view: PlayerView }
  | { type: UIActions.EndTurn; team: Team };
