import shortid from "shortid";

import { PlayerView, Game } from "./../types";
import { DEFAULT_WORD_LIST } from "./../constants";
import { ActionTypes, UIActions, GameActions } from "./actions";

interface UIState {
  wordsList: string;
  gameCode: string;
  view: PlayerView;
}

export enum GameDataState {
  Initial = "Initial",
  CreateGameLoading = "CreateGameLoading",
  CreateGameComplete = "CreateGameComplete",
  Loading = "Loading",
  Updating = "Updating",
  Complete = "Complete",
  Failed = "Failed",
}

interface GameState {
  loadState: GameDataState;
  latestTimestamp: number | null;
  current: null | {
    timestamp: number;
    data: Game;
  };
}

export interface RootState {
  ui: UIState;
  game: GameState;
}

export function initializeState(): RootState {
  let gameCode;
  const gameCodeMatch = window.location.pathname.match(/\/(\w+)/);
  if (gameCodeMatch) {
    gameCode = gameCodeMatch[1];
  } else {
    gameCode = shortid.generate();
  }
  return {
    ui: {
      view: "player" as PlayerView,
      wordsList: DEFAULT_WORD_LIST,
      gameCode: gameCode,
    },
    game: {
      loadState: GameDataState.Initial,
      latestTimestamp: null,
      current: null,
    },
  };
}

function uiReducer(state: UIState, action: ActionTypes): UIState {
  switch (action.type) {
    case UIActions.ChangePlayerView:
      return { ...state, view: action.view };
    case UIActions.UpdateGameCodeInput:
      return { ...state, gameCode: action.value };
    case UIActions.UpdateWordsListInput:
      return { ...state, wordsList: action.value };
    default:
      return state;
  }
}

function gameReducer(state: GameState, action: ActionTypes): GameState {
  switch (action.type) {
    case GameActions.CreateGameLoading:
      return { ...state, loadState: GameDataState.CreateGameLoading };
    case GameActions.CreateGameComplete:
      return {
        ...state,
        loadState: GameDataState.CreateGameComplete,
        latestTimestamp: action.ts,
        current: { timestamp: action.ts, data: action.game },
      };
    case GameActions.FetchGameLoading:
      return { ...state, loadState: GameDataState.Loading };
    case GameActions.FetchGameUpdating:
      return { ...state, loadState: GameDataState.Updating };
    case GameActions.UpdateGameLoading:
      return { ...state, loadState: GameDataState.Updating };
    case GameActions.FetchGameComplete:
    case GameActions.UpdateGameComplete:
      return {
        ...state,
        loadState: GameDataState.Complete,
        latestTimestamp: action.ts,
        current: { timestamp: action.ts, data: action.game },
      };
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
