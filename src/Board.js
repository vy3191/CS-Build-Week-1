import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const numberOfRows = 25;
const numberOfColumns = 25;


function Board() { 
  const operations = [
    [0,1],
    [0,-1],
    [1,-1],
    [-1,1],
    [1,1],
    [-1,-1],
    [1,0],
    [-1,0]
  ];
  
  const generateEmptyGrid = () => {
    const rows = [];
    for(let i=0; i<numberOfRows; i++) {
       rows.push(Array.from(Array(numberOfColumns), () => 0));
    }
    return rows;
  }
  
  const getRandom = () => {
    const rows = [];
    for(let i=0; i<numberOfRows; i++) {
       rows.push(Array.from(Array(numberOfColumns), () => (Math.random() > 0.65 ? 1 : 0)))
    };
    setGrid(rows);
  }
  const [grid, setGrid ] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  const runSimulation = useCallback(() =>{
    // if we are not running return 
    if(!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, gridCopy => {
        for(let i=0; i<numberOfRows; i++) {
          for(let k=0; k<numberOfColumns; k++) {
            let neighbors = 0;
            operations.forEach(([x,y]) => {
                const newI = i+x;
                const newK = k+y;
                if(newI >= 0 && newI < numberOfRows && newK>=0 && newK < numberOfColumns) {
                      neighbors += g[newI][newK]
                }
            });
            if(neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            }else if(g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    
    setTimeout(runSimulation, 100)
  },[]);

  console.log(grid);
  return (
    <div className="container">
      <div className="buttons-container">
        <h1>Game of Life</h1>
        <button onClick={() => {
           setRunning(!running);
           if(!running) {
            runningRef.current = true;
            runSimulation();
           }
           }}
        >{running ? 'Stop': 'Start'}</button>
        <button>Stop</button>
        <button onClick={() => getRandom()}>Random</button>
        <button onClick={() => {
             setGrid(generateEmptyGrid());
        }}>Clear</button>
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
