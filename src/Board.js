import React, { useState } from 'react';
import produce from 'immer';

const numberOfRows = 25;
const numberOfColumns = 25;

function Board() {
  const [grid, setGrid ] = useState(() => {
     const rows = [];
     for(let i=0; i<numberOfRows; i++) {
        rows.push(Array.from(Array(numberOfColumns), () => 0));
     }
     return rows;
  })
  console.log(grid);
  return (
    <div className="container">
      <div className="buttons-container">
        <h1>Game of Life</h1>
        <button>Start</button>
        <button>Stop</button>
        <button>Random</button>
        <button>Clear</button>
      </div>
      <div className="grid-show">
        {grid.map((rows, rowIndex) => 
          rows.map((column, columnIndex) =>{
            return <div 
              onClick={() => {
                const modifiedGrid = produce(grid, (singleGrid) => {
                  singleGrid[rowIndex][columnIndex] = (singleGrid && singleGrid[rowIndex][columnIndex]) ? 0 : 1;
                  
                })
                setGrid(modifiedGrid)
              }}
              key={`${rowIndex}-${columnIndex}`}
              style={{
                width:20, 
                height:20, 
                backgroundColor: grid[rowIndex][columnIndex] ? 'black' : undefined, 
                border: '1px solid gray'
              }}

            />
        }))}
      </div>
    </div>
  )
};

export default Board
