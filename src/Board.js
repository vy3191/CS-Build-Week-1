import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const numberOfRows = 25;
const numberOfColumns = 25;

function Board() {
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  const [grid, setGrid ] = useState(() => {
     const rows = [];
     for(let i=0; i<numberOfRows; i++) {
        rows.push(Array.from(Array(numberOfColumns), () => 0));
     }
     return rows;
  })
  const runSimulation = useCallback(() =>{
    // if we are not running return 
    if(!running) {
      return;
    }
    setTimeout(runSimulation, 1000)
  },[]);
  console.log(grid);
  return (
    <div className="container">
      <div className="buttons-container">
        <h1>Game of Life</h1>
        <button onClick={() => setRunning(!running)}>{running ? 'Stop': 'Start'}</button>
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
