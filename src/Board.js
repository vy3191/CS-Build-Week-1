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
    <div>
      <h1>Grid here</h1>
      {grid.map()}
    </div>
  )
}

export default Board
