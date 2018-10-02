import './App.css';
import React, { Component } from 'react';
import Main from '../Main/Main'
import NavBar from '../NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Main />
      </div>
    );
  }
}

export default App;
