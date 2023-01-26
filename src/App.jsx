import confetti from "canvas-confetti"
import { useState } from "react"
import { EndGameModal } from "./components/EndGameModal";
import { Square } from "./components/Square"
import { GAME_STATUS, TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board.js";

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.in_game);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(TURNS.X);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameStatus(GAME_STATUS.in_game);
    setWinner(null);
    setTurn(TURNS.X);
  }
  
  const updateBoard = (index) => {
    if (board[index]) return;
    if (winner === GAME_STATUS.winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

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
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <EndGameModal gameStatus={gameStatus} winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
