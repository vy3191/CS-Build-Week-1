import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const numberOfRows = 25;
const numberOfColumns = 25;


function Board() { 
  const [running, setRunning] = useState(false);
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
  
 
  const [grid, setGrid ] = useState(() => generateEmptyGrid());
  const getRandom = () => {
    const rows = [];
    for(let i=0; i<numberOfRows; i++) {
      rows.push(Array.from(Array(numberOfColumns), () => (Math.random() > 0.7 ? 1 : 0)))
    };
    setGrid(rows);
  }
  const runningRef = useRef(running);
  const runSimulation = useCallback(() =>{
    // if we are not running return 
    console.log('isApp running>>>>>>>>>>>', runningRef.current);
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
                if(newI >= 0 && newI < numberOfRows && newK >= 0 && newK < numberOfColumns) {
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
    
    setTimeout(runSimulation, 500)
  },[numberOfRows, numberOfColumns]);

  console.log('Before click', running);
  return (
    <div className="container">
      <div className="buttons-container">
        <h1>Game of Life</h1>
        <button onClick={() => {
          setRunning(!running);
          console.log('aFTER click', running);
            if(!running) {
              console.log('inside the if clause', running) 
              console.log('inside the if block runningRef value-1', runningRef.current)
              runningRef.current = !runningRef.current;
              console.log('inside the if block runningRef value-2', runningRef.current)
              runSimulation();
            }
        }}
        >Start</button>
        <button onClick={
         () => {
          setRunning(!running);
          runningRef.current = !runningRef.current;
         }
        }>Stop</button>
        <button onClick={() => getRandom()}>Random</button>
        <button onClick={() => {
            //  setRunning(!running)
            //  runningRef.current = !runningRef.current;
             setGrid(generateEmptyGrid());
        }}>Clear</button>
      </div>
      <div className="grid-show">
        {grid.map((rows, rowIndex) => 
          rows.map((column, columnIndex) =>{
            return <div 
              onClick={() => {
                const modifiedGrid = produce(grid, (singleGrid) => {
                  singleGrid[rowIndex][columnIndex] = (singleGrid[rowIndex][columnIndex]) ? 0 : 1;                  
                });
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

export default Board;
