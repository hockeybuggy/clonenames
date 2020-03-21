import { call, select, all, put, takeEvery } from "redux-saga/effects";

import { GameActions } from "./actions";
import { getWordsList, getGameCode } from "./selectors";
import { createGame } from "../api";
import { GameService } from "../services";

// Our worker Saga
export function* createGameAsync() {
  yield put({ type: GameActions.CreateGameLoading });
  const gameCode = yield select(getGameCode);
  const wordsList = yield select(getWordsList);

  const game = GameService.create(gameCode, wordsList);
  console.log(game);
  // TODO catch error for invalid world list
  yield call(createGame, game);
  // TODO catch error game already existing
  // TODO catch error for network
  yield put({ type: GameActions.CreateGameComplete });
}

// Our watcher Saga
export function* watchCreateGame() {
  // TODO take first?
  yield takeEvery(GameActions.CreateGame, createGameAsync);
}

export default function* rootSaga() {
  yield all([watchCreateGame()]);
}
