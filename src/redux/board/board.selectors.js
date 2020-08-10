import { createSelector } from "reselect";

const selectBoard = (state) => state.board;

export const selectBoardHistory = createSelector(
  [selectBoard],
  (board) => board.history
);

export const selectCurrentMove = createSelector(
  [selectBoard],
  (board) => board.currentMove
);

export const selectId = createSelector([selectBoard], (board) => board.id);
export const selectWinner = createSelector(
  [selectBoard],
  (board) => board.winner
);
