import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import './App.css';
import Examples from '../Searchbox/Searchbox';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Examples />
      </div>
    );
  }
}

export default App;
