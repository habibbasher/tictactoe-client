import React from "react";
import "../../styles/root.styles.scss";

import Board from "../../components/board/Board";

const App = () => {
  return (
    <div className="app">
      <h1>tic-tac-toe</h1>
      <Board />
    </div>
  );
};

export default App;
