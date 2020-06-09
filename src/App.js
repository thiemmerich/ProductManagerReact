import React, { Component } from 'react';
import './global-styles.css';

import Header from './components/Header/Header';
import Main from './pages/main/main';
import Login from './pages/login/login';
import Cadastro from './components/Cadastro/Cadastro';
import Modal from './components/Cadastro/Modal';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

//export default App;
