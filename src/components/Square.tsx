/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

type SquareProps = {
  index?: number;
  isSelected?: boolean;
  children?: React.ReactNode;
  updateBoard?: ( idx: number) => void; 
}

const Square: React.FC<SquareProps> = ({ children, isSelected, index, updateBoard = () => {} }) => {
  const className = `square ${isSelected ? 'is-selected': ''}`; 
  const handleOnClick = () => {
      if(typeof index === 'number'){
        updateBoard(index);
      }
    };

    return (
      <div className={className} onClick={handleOnClick}>
        {children}
      </div>
    );
};

export default Square;