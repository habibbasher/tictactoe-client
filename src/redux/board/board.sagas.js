import { all, call, takeLatest, put } from "redux-saga/effects";

import {
  createGameFailure,
  createGameSuccess,
  updateGameSuccess,
} from "./board.actions";
import { BoardActionTypes } from "./board.types";

import { callAPI } from "../../utils/callApi";

const processedPayload = (payload) => {
  const last = payload.history[payload.history.length - 1];
  const newBoard = last.board.map((square, pos) => {
    if (pos === payload.position) {
      return last.isXNext ? "X" : "O";
    }
    return square;
  });
  return {
    history: payload.history.concat({
      board: newBoard,
      isXNext: !last.isXNext,
    }),
    currentMove: payload.currentMove + 1,
    winner: payload.winner,
  };
};

export function* createNewGame({ payload }) {
  const gamePayload = processedPayload(payload);
  try {
    const result = yield callAPI("POST", "/game/create", gamePayload);
    yield put(createGameSuccess(result));
  } catch (error) {
    yield put(createGameFailure(error));
  }
}

export function* updateGame({ payload }) {
  const gamePayload = processedPayload(payload);
  try {
    const result = yield callAPI("PUT", `/games/${payload.id}`, gamePayload);
    yield put(updateGameSuccess(result));
  } catch (error) {
    yield put(createGameFailure(error));
  }
}

export function* onCreateGameStart() {
  yield takeLatest(BoardActionTypes.CREAT_GAME_START, createNewGame);
}

export function* onUpdateGameStart() {
  yield takeLatest(BoardActionTypes.UPDATE_GAME_START, updateGame);
}

export function* boardSagas() {
  yield all([call(onCreateGameStart), call(onUpdateGameStart)]);
}
