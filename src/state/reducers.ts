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
  return {
    ui: {
      view: "player" as PlayerView,
      wordsList: DEFAULT_WORD_LIST,
      gameCode: "cargo", // TODO randomize this
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
    case UIActions.SelectWord:
      return state; // TODO unstub
    case UIActions.ChangePlayerView:
      return { ...state, view: action.view };
    case UIActions.EndTurn:
      return state; // TODO unstub
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
    case GameActions.LoadGame:
      return state; // TODO unstub
    case GameActions.CreateGame:
      return state; // TODO unstub
    case GameActions.CreateGameLoading:
      return { ...state, loadState: GameDataState.CreateGameLoading };
    case GameActions.CreateGameComplete:
      return state; // TODO unstub
    case GameActions.FetchGameLoading:
      return { ...state, loadState: GameDataState.Loading };
    case GameActions.FetchGameComplete:
    case GameActions.UpdateGameComplete:
      // TODO don't update if the incoming new game state is newer that the latestTimestamp

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
