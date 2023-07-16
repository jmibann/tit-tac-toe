import React from 'react';
import { Square } from './index';

interface WinnerModalProps {
  winner: string | boolean | null;
  resetGame: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({winner, resetGame}) => {
  if( winner === null) return;

  const winnerText =  winner === false ? 'Tie' : 'Won: ';

    return (
      <section className='modal'>
        <div className='text'>
          <h2>{winnerText}</h2>
          { winner && 
              <header className='header'>
                <Square>{winner}</Square>
              </header>
          }  

          <footer>
            <button onClick={resetGame}>Start again</button>
          </footer>
        </div>
      </section>
    );
};

export default WinnerModal