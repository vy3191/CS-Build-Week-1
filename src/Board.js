import React, { useState } from 'react';

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
    <div className="grid-show">
      {grid.map((rows, rowIndex) => 
        rows.map((column, columnIndex) =>{
          return <div 
            
            key={`${rowIndex}-${columnIndex}`}
            style={{width:20, height:20, backgroundColor: grid[rowIndex][columnIndex] ? 'black' : undefined, border: '1px solid gray'}}

          />
      }))}
    </div>
  )
};

export default Board
