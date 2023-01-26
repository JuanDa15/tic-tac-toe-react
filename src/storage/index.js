export function saveGameStorage( {board, turn}) {
 localStorage.setItem('board', JSON.stringify(board));
 localStorage.setItem('turn', JSON.stringify(turn));
}

export function resetGameStorage() {
 localStorage.removeItem('board');
 localStorage.removeItem('turn');
}