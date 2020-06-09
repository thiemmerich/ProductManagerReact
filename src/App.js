import React, { Component } from 'react';
import './styles.css';

import Header from './components/Header/Header';
import Main from './pages/main/main';
import Login from './pages/login/login';
import Cadastro from './components/Cadastro/Cadastro';
import Modal from './components/Cadastro/Modal';

export default class App extends Component {

  state = {
    show: false
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Modal show={this.state.show} handleClose={this.hideModal} >
          <Cadastro />
        </Modal>
        <button type='button' onClick={this.showModal}>Open</button>
        <Main/>
      </div>
    );
  }
}

//export default App;
