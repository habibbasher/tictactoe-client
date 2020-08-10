import { BoardActionTypes } from "./board.types";

export const onMove = (position = 0) => ({
  type: BoardActionTypes.ON_MOVE,
  payload: position,
});

export const onNewGame = () => ({
  type: BoardActionTypes.ON_NEW_GAME,
});

export const createGameStart = (gamePayload) => ({
  type: BoardActionTypes.CREAT_GAME_START,
  payload: gamePayload,
});

export const createGameSuccess = (gamePayload) => ({
  type: BoardActionTypes.CREAT_GAME_SUCCESS,
  payload: gamePayload,
});

export const createGameFailure = (error) => ({
  type: BoardActionTypes.CREAT_GAME_FAILURE,
  payload: error,
});

export const updateGameStart = (gamePayload) => ({
  type: BoardActionTypes.UPDATE_GAME_START,
  payload: gamePayload,
});

export const updateGameSuccess = (gamePayload) => ({
  type: BoardActionTypes.UPDATE_GAME_SUCCESS,
  payload: gamePayload,
});
