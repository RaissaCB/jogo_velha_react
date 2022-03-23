import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const emptyBoard = Array(9).fill("");
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState(null);

  const handleCellClick = (index) => {
    if (player) {
      console.log("Jogo finalizado");
      return null;
    }

    if (board[index] !== "") return null;

    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item
      )
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkPlayer = () => {
    const possibleToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];
    possibleToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")) setPlayer("O");
      if (cells.every((cell) => cell === "X")) setPlayer("X");
    });

    checkDraw();
  };

  const checkDraw = () => {
    if (board.every((item) => item !== "")) setPlayer("E");
  };

  useEffect(checkPlayer, [board]);

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setPlayer(null);
  };

  return (
    <main>
      <h1 className="tittle"> Jogo da Velha</h1>
      <div className={`board ${player ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      {player && (
        <footer>
          {player === "E" ? (
            <h2 className="player-message">
              <span className={player}></span> Empatou!
            </h2>
          ) : (
            <h2 className="player-message">
              <span className={player}> </span>
              {player} Venceu!{" "}
            </h2>
          )}
          <button onClick={resetGame}> Recomeçar o Jogo </button>
        </footer>
      )}
    </main>
  );
}
