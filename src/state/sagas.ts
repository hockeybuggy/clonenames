import {
  call,
  select,
  all,
  put,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import { GameActions, ActionTypes } from "./actions";

import { getWordsList, getGameCode } from "./selectors";
import API from "../api";
import { GameService } from "../services";

export function* createGameAsync() {
  yield put<ActionTypes>({ type: GameActions.CreateGameLoading });
  const gameCode = yield select(getGameCode);
  const wordsList = yield select(getWordsList);

  const game = GameService.create(gameCode, wordsList);
  console.log(game);
  // TODO catch error for invalid world list
  yield call(API.createGame, game);
  // TODO catch error game already existing
  // TODO catch error for network
  yield put<ActionTypes>({ type: GameActions.CreateGameComplete });
}

export function* watchCreateGame() {
  // TODO take first?
  yield takeEvery(GameActions.CreateGame, createGameAsync);
}

export function* loadGameAsync() {
  yield put<ActionTypes>({ type: GameActions.FetchGameLoading });
  const gameCode = yield select(getGameCode);

  // TODO catch error for invalid world list
  const { game, ts } = yield call(API.loadGame, gameCode);
  // TODO catch error game already existing
  // TODO catch error for network
  yield put<ActionTypes>({ type: GameActions.FetchGameComplete, game, ts });
}

export function* watchLoadGame() {
  yield takeLatest(GameActions.LoadGame, loadGameAsync);
}

export default function* rootSaga() {
  yield all([watchCreateGame(), watchLoadGame()]);
}
