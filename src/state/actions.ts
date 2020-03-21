import { GameId, Guess, PlayerView, Team } from "./../types";

export enum GameActions {
  LoadGame = "LoadGame",
  CreateGame = "CreateGame",
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
  | { type: GameActions.LoadGame; gameId: GameId }
  | { type: GameActions.CreateGame; guess: Guess }
  | { type: UIActions.UpdateGameCodeInput; value: string }
  | { type: UIActions.UpdateWordsListInput; value: string }
  | { type: UIActions.SelectWord; word: string }
  | { type: UIActions.ChangePlayerView; view: PlayerView }
  | { type: UIActions.EndTurn; team: Team };
