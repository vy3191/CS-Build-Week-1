import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import produce from 'immer';

const timeOptions = [
  { value: '200', label: '200' },
  { value: '300', label: '300' },
  { value: '400', label: '400' },
  { value: '500', label: '500' },
  { value: '600', label: '600' },
  { value: '700', label: '700' },
  { value: '800', label: '800' },
  { value: '900', label: '900' },
  { value: '1000', label:'1000' },
  { value: '5000', label:'5000' },
];

const colorOptions = [
  {value: '#FA8072', label: 'SALMON'},
  {value: '#FF0000', label: 'RED'},
  {value: '#008000', label: 'GREEN'},
  {value: '#0000FF', label: 'BLUE'},
  {value: '#800080', label: 'PURPLE'},
  {value: '#FF1493', label: 'PINK'},
  {value: '#FF4500', label: 'ORANGE'},

]

function Board() { 
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(200);
  const [numberOfRows, setNumberOfRows] = useState(25);
  const [numberOfColumns, setNumberOfColumns] = useState(25);
  const [color, setColor] = useState('black');
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
    console.log('time>>>>>>>>>>>>>',time, typeof(time));
    setTimeout(runSimulation, parseInt(time))
  },[numberOfRows, numberOfColumns,time]);



  const handleTime = (time) => {
    setTime(parseInt(time.value));
    console.log(`Option selected:`, time.value);
  };

  const handleColor = (color) => {
     setColor(color.value);
  }

  console.log('Before click', running);
  console.log('time or speed', time);
  return (
    <React.Fragment>
     <Link exact to="/">Home</Link>
     <Link to="/about">About</Link>
     <div className="select-options">
        <Select
          value={parseInt(time)}
          defaultValue={timeOptions[2]}
          label="choose speed"
          onChange={handleTime}
          options={timeOptions}
          placeholder="Choose speed"
        />
        <Select
          value={color}
          defaultValue={colorOptions[1]}
          onChange={handleColor}
          options={colorOptions}
          placeholder="Choose color"
        />
      </div>
    <div className="container">     
      <div className="buttons-container">
        <h1>Game of Life</h1>
        <button onClick={() => {
          if(running) return;
          setRunning(!running);
          // console.log('aFTER click', running);
            if(!running) {
              // console.log('inside the if clause', running) 
              // console.log('inside the if block runningRef value-1', runningRef.current)
              runningRef.current = !runningRef.current;
              // console.log('inside the if block runningRef value-2', runningRef.current)
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
              onClick={running ? () => {return;} : () => {
                const modifiedGrid = produce(grid, (singleGrid) => {
                  singleGrid[rowIndex][columnIndex] = (singleGrid[rowIndex][columnIndex]) ? 0 : 1;                  
                });
                setGrid(modifiedGrid)
              }}
              key={`${rowIndex}-${columnIndex}`}
              style={{
                width:20, 
                height:20, 
                backgroundColor: grid[rowIndex][columnIndex] ? color : undefined, 
                border: '1px solid gray'
              }}
            />
        }))}
      </div>
    </div>
    </React.Fragment>
  )
};

export default Board;
