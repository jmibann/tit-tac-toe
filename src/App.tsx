/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import confetti from 'canvas-confetti';

import './App.css'
import { Square, WinnerModal } from './components';

import { TURNS } from './constants'
import { checkWinner, checkEndedGame } from './utils';
import { useLocalStorage } from './hooks';

function App() {
  const [board, setBoard] = useLocalStorage<(string | null)[]>( 'tic-tac-toe', Array(9).fill(null) );
  const [winner, setWinner] = useState<string | null | boolean>(null);
  const [turn, setTurn] = useState(TURNS.X);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  const insertPlayersChoice = (index: number) => {
    let updatedBoard;

    if(index){
      updatedBoard = [...board.slice(0, index), turn, ...board.slice(index+1)];
    } else {
      updatedBoard = [turn, ...board.slice(1)];
    }

      return updatedBoard;
  }

  const updateBoard = (index: number) => {
    if(winner) return;
    if(board[index]) return;
    
    const updatedBoard = insertPlayersChoice(index);

    if(checkWinner(updatedBoard)){
      confetti();
      setWinner(turn)
    }else if(checkEndedGame(updatedBoard)){
      setWinner(false);
    } else {
      setTurn(prev => prev===TURNS.X ? TURNS.O : TURNS.X)
    }

    setBoard(updatedBoard);
  }

  return (
      <main className='board'>
        <h1>Tic Tac Toe Excercise</h1>
        <button onClick={resetGame}>Reset Game</button>

        <section className='game'>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            board.map( (cell, idx) =>
              <Square key={`square-${idx}`} index={idx} updateBoard={updateBoard}>{cell}</Square>)
          }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner}/>
      </main>
  )
}

export default App;
