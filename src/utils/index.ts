import { WINNER_RESULTS } from '../constants'

export const checkWinner = (boardState: string[]) => {
  let isWinner = false;

  WINNER_RESULTS.forEach(state => {
    const [a, b, c] = state;

    const isNotEmpty = Boolean(boardState[a]);
    const areEquals = Boolean(boardState[a] === boardState[b]) && (boardState[b] === boardState[c]);

    if (isNotEmpty && areEquals) {
      isWinner = true;
    }

  });

  return isWinner;
};

export const checkEndedGame = (array: Array<string | null>) => (array.indexOf(null) < 0);