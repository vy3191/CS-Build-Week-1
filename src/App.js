import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Board from './Board';
import About from './About';
import './App.css';

function App() {
  return (
    <div className="body">
    <Router>
      <Route exact path="/" component={Board} />
      <Route path="/about" component={About} />
    </Router>  
    </div>
  )
}

export default App;
