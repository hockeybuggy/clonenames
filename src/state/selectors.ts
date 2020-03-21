import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from "react-redux";
import { RootState } from "./reducers";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export { useDispatch };
