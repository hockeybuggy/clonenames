import { Game } from "./../types";
import { DEFAULT_WORD_LIST } from "./../constants";
import { ActionTypes, UIActions, GameActions } from "./actions";

interface UIState {
  wordsList: string;
  gameCode: string;
}

export enum GameDataState {
  Initial = "Initial",
  Loading = "Loading",
  Updating = "Updating",
  Complete = "Complete",
  Failed = "Failed",
}

interface GameState {
  state: GameDataState;
  current: Game | null;
}

export interface RootState {
  ui: UIState;
  game: GameState;
}

export function initializeState(): RootState {
  return {
    ui: {
      wordsList: DEFAULT_WORD_LIST,
      gameCode: "cargo", // TODO randomize this
    },
    game: null,
  };
}

function uiReducer(state: UIState, action: ActionTypes): UIState {
  switch (action.type) {
    case UIActions.SelectWord:
      return state; // TODO unstub
    case UIActions.ChangePlayerView:
      return state; // TODO unstub
    case UIActions.EndTurn:
      return state; // TODO unstub
    case UIActions.UpdateGameCodeInput:
      return { ...state, gameCode: action.value };
    default:
      return state;
  }
}

function gameReducer(state: GameState, action: ActionTypes): GameState {
  switch (action.type) {
    case GameActions.LoadGame:
      return Object.assign({}, state, { state: GameDataState.Loading });
    case GameActions.CreateGame:
      return state; // TODO unstub
    default:
      return state;
  }
}

export function rootReducer(state: RootState, action: ActionTypes): RootState {
  return {
    ui: uiReducer(state.ui, action),
    game: gameReducer(state.game, action),
  };
}
