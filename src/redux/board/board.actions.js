import { BoardActionTypes } from "./board.types";

export const onMove = (position = 0) => ({
  type: BoardActionTypes.ON_MOVE,
  payload: position,
});

export const onNewGame = () => ({
  type: BoardActionTypes.ON_NEW_GAME,
});
