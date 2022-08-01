import React, { useState } from "react";
import { calculateWinner } from "../../untils";
import Board from "./Board";
import "./Tictactoe.css";

const Game = () => {
  const [state, setState] = useState({
    board: Array(9).fill(null),
    xIsNext: true,
  });

  const winner = calculateWinner(state.board);
  const handleClick = (index) => {
    const boardCopy = [...state.board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = state.xIsNext ? "X" : "O";
    // setState(boardCopy);
    // setXIsNext(!state.xIsNext);
    setState({
      ...state,
      board: boardCopy,
      xIsNext: !state.xIsNext,
    });
  };
  return (
    <div className="wrapper">
      <Board cells={state.board} onClick={handleClick}></Board>
      <div className="control">
        <button
          class="game-reset"
          onClick={() =>
            setState({ ...state, board: Array(9).fill(null), xIsNext: true })
          }
        >
          Reset
        </button>
        <span>{winner ? `${winner} is winner` : "No one is winner"}</span>
      </div>
    </div>
  );
};

export default Game;
