import React, { useReducer } from "react";
import { calculateWinner } from "../../untils";
import Board from "./Board";

function reducer(state, action) {
  switch (action.type) {
    case "click": {
      const { board, xIsNext } = state;
      const { index, winner } = action.payload;
      //   Cần copy ra một state mới để không ảnh hưởng đến state cũ
      const newState = JSON.parse(JSON.stringify(state));
      //   Nếu bình thường thì return; để không làm gì cả
      // Còn ở đây reducer bắt buộc phải trả ra một cái state nên nếu không làm gì thì trả ra state cũ
      if (winner || newState.board[index]) return state;
      newState.board[index] = xIsNext ? "X" : "O";
      newState.xIsNext = !xIsNext;
      console.log(newState.board);
      return newState;
      //   break;
    }

    case "reset": {
      const { board, xIsNext } = initVal;
      const newState = JSON.parse(JSON.stringify(state));
      newState.board = board;
      newState.xIsNext = xIsNext;
      return newState;
    }

    default:
      console.log("Error");
      break;
  }
  return state;
}
const initVal = {
  board: Array(9).fill(null),
  xIsNext: true,
};
const GameReducer = () => {
  const [state, dispatch] = useReducer(reducer, initVal);

  let winner = null;
  winner = calculateWinner(state.board);
  const handleClick = (index) => {
    dispatch({ type: "click", payload: { index, winner } });
  };
  return (
    <div className="wrapper">
      <Board cells={state.board} onClick={handleClick}></Board>
      <div className="control">
        <button class="game-reset" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
        <span>{winner ? `${winner} is winner` : "No one is winner"}</span>
      </div>
    </div>
  );
};

export default GameReducer;
