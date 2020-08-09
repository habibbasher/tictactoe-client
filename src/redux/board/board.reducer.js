import { BoardActionTypes } from "./board.types";

const INITIAL_STATE = {
  history: [
    {
      board: Array(9).fill(null),
      isXNext: true,
    },
  ],
  currentMove: 0,
};

const onMove = (state, action) => {
  const last = state.history[state.history.length - 1];
  console.log("last ", last);
  const newBoard = last.board.map((square, pos) => {
    if (pos === action.payload) {
      return last.isXNext ? "X" : "O";
    }
    return square;
  });
  return {
    ...state,
    history: state.history.concat({ board: newBoard, isXNext: !last.isXNext }),
    currentMove: state.currentMove + 1,
  };
};

const onNewGame = (state) => {
  return {
    ...state,
    ...INITIAL_STATE,
  };
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BoardActionTypes.ON_MOVE:
      return onMove(state, action);
    case BoardActionTypes.ON_NEW_GAME:
      return onNewGame(state);
    default:
      return state;
  }
};

export default boardReducer;
