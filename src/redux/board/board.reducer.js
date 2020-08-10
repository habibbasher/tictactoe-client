import { BoardActionTypes } from "./board.types";

const INITIAL_STATE = {
  history: [
    {
      board: Array(9).fill(null),
      isXNext: true,
    },
  ],
  currentMove: 0,
  winner: null,
  id: null,
};

const onMove = (state, action) => {
  const last = state.history[state.history.length - 1];
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

const createGameSuccess = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

const handleFailure = (state, action) => {
  return {
    ...state,
    error: action.payload,
  };
};

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BoardActionTypes.ON_MOVE:
      return onMove(state, action);
    case BoardActionTypes.CREAT_GAME_SUCCESS:
    case BoardActionTypes.UPDATE_GAME_SUCCESS:
      return createGameSuccess(state, action);
    case BoardActionTypes.ON_NEW_GAME:
      return onNewGame(state);
    case BoardActionTypes.CREAT_GAME_FAILURE:
      return handleFailure(state, action);
    default:
      return state;
  }
};

export default boardReducer;
