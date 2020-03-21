import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux";
import { RootState } from "./reducers";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const getGameCode = (state: RootState): string => state.ui.gameCode;
export const getWordsList = (state: RootState): string => state.ui.wordsList;

export { useDispatch };
