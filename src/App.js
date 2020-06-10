import React, { Component } from 'react';
import './global-styles.css';

import Routes from './router';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

//export default App;
