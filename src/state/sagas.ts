import {
  call,
  delay,
  race,
  take,
  select,
  all,
  put,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import { UIActions, GameActions, ActionTypes } from "./actions";
import { getWordsList, getGameCode, getCurrentGame } from "./selectors";
import { GameDataState } from "./reducers";
import API from "../api";
import { GameService } from "../services";
import { Game, Timestamp, Word } from "../types";

export function* createGameAsync() {
  yield put<ActionTypes>({ type: GameActions.CreateGameLoading });
  const gameCode = yield select(getGameCode);
  const wordsList = yield select(getWordsList);

  // TODO catch error for invalid world list
  const newGame = GameService.create(gameCode, wordsList);

  const { game, ts } = yield call(API.createGame, newGame);

  // TODO catch error game already existing
  // TODO catch error for network
  yield put<ActionTypes>({ type: GameActions.CreateGameComplete, game, ts });
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
  // TODO catch error game not existing
  // TODO catch error for network
  yield put<ActionTypes>({ type: GameActions.FetchGameComplete, game, ts });
  yield put<ActionTypes>({ type: GameActions.PollGame });
}

export function* watchLoadGame() {
  yield takeLatest(GameActions.LoadGame, loadGameAsync);
}

export function* pollTask() {
  yield put<ActionTypes>({ type: GameActions.FetchGameUpdating });
  const gameCode = yield select(getGameCode);

  // TODO catch error for invalid world list
  const { game, ts } = yield call(API.loadGame, gameCode);
  // TODO catch error for network
  yield put<ActionTypes>({ type: GameActions.FetchGameComplete, game, ts });
  yield delay(20000);
  yield put<ActionTypes>({ type: GameActions.PollGame });
}

export function* watchPollGame() {
  yield takeLatest(GameActions.PollGame, pollTask);
}

export function* makeMoveAsync(action: {
  type: UIActions.SelectWord;
  word: Word;
}): any {
  const [loadState, currentTimestamp, game] = yield select(getCurrentGame);
  if (loadState == GameDataState.Complete) {
    const newGame = GameService.makeMove(game, { word: action.word });
    yield put<ActionTypes>({
      type: GameActions.UpdateGame,
      ts: currentTimestamp,
      game: newGame,
    });
  }
}

export function* watchSelectWord() {
  yield takeEvery(UIActions.SelectWord, makeMoveAsync);
}

export function* nextGameAsync(): any {
  const [loadState, currentTimestamp, game] = yield select(getCurrentGame);
  if (loadState == GameDataState.Complete) {
    const wordsList = yield select(getWordsList);
    const newGame = GameService.reset(game, wordsList);
    yield put<ActionTypes>({
      type: GameActions.UpdateGame,
      ts: currentTimestamp,
      game: newGame,
    });
  }
}
export function* watchNextGame() {
  yield takeEvery(UIActions.NextGame, nextGameAsync);
}

export function* endTurnAsync(): any {
  const [loadState, currentTimestamp, game] = yield select(getCurrentGame);
  if (loadState == GameDataState.Complete) {
    const newGame = {
      ...game,
      currentTurn: game.currentTurn === "red" ? "blue" : "red",
    };
    yield put<ActionTypes>({
      type: GameActions.UpdateGame,
      ts: currentTimestamp,
      game: newGame,
    });
  }
}
export function* watchEndTurn() {
  yield takeEvery(UIActions.EndTurn, endTurnAsync);
}

export function* updateGameAsync(action: {
  type: GameActions.UpdateGame;
  ts: Timestamp;
  game: Game;
}) {
  yield put<ActionTypes>({ type: GameActions.UpdateGameLoading });

  const { game, ts, error } = yield call(
    API.updateGame,
    action.ts,
    action.game
  );
  if (error) {
    // TODO catch error conflict
    console.log("Error in update", error);
  } else {
    // TODO catch error for network
    yield put<ActionTypes>({ type: GameActions.UpdateGameComplete, game, ts });
  }
}

export function* watchUpdateGame() {
  // TODO Take latest?
  yield takeEvery(GameActions.UpdateGame, updateGameAsync);
}

export default function* rootSaga() {
  yield all([
    watchCreateGame(),
    watchLoadGame(),
    watchSelectWord(),
    watchNextGame(),
    watchUpdateGame(),
    watchEndTurn(),
    watchPollGame(),
  ]);
}
