import confetti from "canvas-confetti"
import { useState } from "react"
import { EndGameModal } from "./components/EndGameModal";
import { Square } from "./components/Square"
import { Turns } from "./components/Turns";
import { GAME_STATUS, TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board.js";
import { resetGameStorage, saveGameStorage } from "./storage";

function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.in_game);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn');
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameStatus(GAME_STATUS.in_game);
    setWinner(null);
    setTurn(TURNS.X);
    resetGameStorage();
  }
  
  const updateBoard = (index) => {
    if (board[index]) return;
    if (winner === GAME_STATUS.winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameStorage({
      board: newBoard,
      turn: newTurn
    });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      setGameStatus(GAME_STATUS.winner);
    } else if (checkEndGame(newBoard)) {
      setGameStatus(GAME_STATUS.tie);
    }
    
  };

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button type="button" onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square 
                key={`square-${index}`}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <Turns turn={turn}/>
      <EndGameModal gameStatus={gameStatus} winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
