import { call, select, all, put, takeEvery } from "redux-saga/effects";

import { GameActions } from "./actions";
import { getGameCode } from "./selectors";
import { createGame } from "../api";
import { Guess, Word, Team } from "../types";

// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Our worker Saga
export function* createGameAsync() {
  yield put({ type: GameActions.CreateGameLoading });
  const gameCode = yield select(getGameCode);
  const game = {
    code: gameCode,
    words: [] as Array<Word>, // TODO split the text box and assign roles
    guesses: [] as Array<Guess>,
    currentTurn: "red" as Team, // Base this on the words
  };
  yield call(createGame, game);
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
