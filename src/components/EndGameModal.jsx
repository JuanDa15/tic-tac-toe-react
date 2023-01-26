import { GAME_STATUS } from "../constants";
import { Square } from "./Square";

export function EndGameModal({gameStatus, winner, resetGame}) {
	// CONDITIONAL RENDER
	if (gameStatus === GAME_STATUS.in_game) return null;

	// CONDITIONAL TEXT
	const winnerText = (gameStatus === GAME_STATUS.tie) ? 'empate' : (gameStatus === GAME_STATUS.winner) && `El ganador es`;

	return (
		<section className='winner'>
			<div className='text'>
				<h2>{winnerText}</h2>
				<header className='win'>{winner && <Square>{winner}</Square>}</header>
				<footer>
					<button type='button' onClick={resetGame}>
						Empezar de nuevo
					</button>
				</footer>
			</div>
		</section>
	);
}
