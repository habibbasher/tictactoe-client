import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectBoardHistory,
  selectCurrentMove,
} from "../../redux/board/board.selectors";
import { onMove, onNewGame } from "../../redux/board/board.actions";

import Square from "../square/Square";
import History from "../history/History";
import StatusMessage from "../statusMessage/StatusMessage";

import { calculateWinner } from "../../utils/helpers";

// const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

const Board = ({ history, currentMove, onMove, onNewGame }) => {
  // const [history, setHistory] = useState(NEW_GAME);
  // const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  console.log("current ", current);

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) return;
    onMove(position);
    // setHistory((prev) => {
    //   const last = prev[prev.length - 1];

    //   const newBoard = last.board.map((square, pos) => {
    //     if (pos === position) {
    //       return last.isXNext ? "X" : "O";
    //     }
    //     return square;
    //   });
    //   return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    // });

    // setCurrentMove((prev) => prev + 1);
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
});

const mapDispatchToProps = (dispatch) => ({
  onMove: (position) => dispatch(onMove(position)),
  onNewGame: () => dispatch(onNewGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
