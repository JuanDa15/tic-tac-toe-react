import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const GAME_STATUS = {
  winner: 'w',
  tie: 't',
  in_game: 'g'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2 ,5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({children, updateBoard, isSelected, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  }
  return (
    <div className={className}
         onClick={handleClick}>
      {children}
    </div>
  )
}

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
  
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a ,b ,c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    
    return null;
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
      setWinner(newWinner);
      setGameStatus(GAME_STATUS.winner);
    }

    if (!newWinner && !newBoard.includes(null)) {
      setGameStatus(GAME_STATUS.tie);
    }
    
  };

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button type="button" onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square 
                key={`square-${index}`}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
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
      
      {
        (gameStatus !==  GAME_STATUS.in_game) && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  gameStatus === GAME_STATUS.tie 
                    ? 'empate' 
                    : (gameStatus === GAME_STATUS.winner) 
                    && `El ganador es`
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button type="button"
                        onClick={ resetGame }>
                  Empezar de nuevo
                </button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
