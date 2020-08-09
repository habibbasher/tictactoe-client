import React from "react";

const Square = ({ value, handleClick, isWinningSquare }) => {
  return (
    <button
      type="button"
      className="square"
      style={{ fontWeight: isWinningSquare ? "bold" : "normal" }}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
