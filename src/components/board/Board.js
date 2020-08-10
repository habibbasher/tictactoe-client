import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectBoardHistory,
  selectCurrentMove,
  selectId,
} from "../../redux/board/board.selectors";
import {
  onMove,
  onNewGame,
  createGameStart,
  updateGameStart,
} from "../../redux/board/board.actions";

import Square from "../square/Square";
import History from "../history/History";
import StatusMessage from "../statusMessage/StatusMessage";

import { calculateWinner } from "../../utils/helpers";

const Board = ({
  history,
  currentMove,
  id,
  onNewGame,
  createGameStart,
  updateGameStart,
}) => {
  const current = history[currentMove];

  let { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) {
      return;
    }
    if (id) {
      updateGameStart({ position, history, currentMove, winner, id });
    } else {
      createGameStart({ position, history, currentMove, winner });
    }
  };

  const renderSquare = (position) => {
    const isWinningSquare = winningSquares.includes(position);
    return (
      <Square
        value={current.board[position]}
        handleClick={() => handleSquareClick(position)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const moveTo = (move) => {
    // setCurrentMove(move);
  };

  return (
    <div className="board">
      <StatusMessage winner={winner} current={current} />
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button type="button" onClick={onNewGame}>
        Start new game
      </button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  history: selectBoardHistory,
  currentMove: selectCurrentMove,
  id: selectId,
});

const mapDispatchToProps = (dispatch) => ({
  onMove: (position) => dispatch(onMove(position)),
  onNewGame: () => dispatch(onNewGame()),
  createGameStart: (payload) => dispatch(createGameStart(payload)),
  updateGameStart: (payload) => dispatch(updateGameStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
