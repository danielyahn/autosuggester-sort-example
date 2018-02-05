import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SuggesterBox from './Suggester';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SuggesterBox/>
      </div>
    );
  }
}

export default App;