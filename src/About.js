import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <React.Fragment>
     <Link to="/">Home</Link>
    <div>
      <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead,. Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur</p>
      <ul>
        <li>Any live cell with fewer than two live neighbors dies, as if by under population.</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
      </ul>
      <p>These rules, which compare the behavior of the automaton to real life, can be condensed into the following:</p>
      <ul>
        <li>Any live cell with two or three live neighbors survives.</li>
        <li>Any dead cell with three live neighbors becomes a live cell.</li>
        <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
      </ul>      
      <p>The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.</p>
    </div>
    </React.Fragment>
  )
}

export default About
