import React from 'react';
import './styles.css';

import Header from './components/Header/Header';
import Main from './pages/main/main';
import Login from './pages/login/login';

function App() {
  /*return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );*/

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
