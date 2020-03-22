import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux";
import { GameDataState, RootState } from "./reducers";
import { PlayerView, Game, Timestamp } from "../types";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const getGameCode = (state: RootState): string => state.ui.gameCode;
export const getWordsList = (state: RootState): string => state.ui.wordsList;

export const getCurrentGame = (
  state: RootState
): [GameDataState, Timestamp | null, Game | null] => {
  return [
    state.game.loadState,
    state.game.current?.timestamp,
    state.game.current?.data,
  ];
};

export const getCurrentPlayerView = (state: RootState): PlayerView =>
  state.ui.view;

export { useDispatch };
