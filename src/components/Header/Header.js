import React from 'react';
import './Header.css';

import logo from '../../images/logo.jpeg';

const Header = () => (
    <div className='main-header'>
        <div >
            <img src={logo} alt="Avatar" className="avatar" />
        </div>
        <button className='logout-button'>Sair</button>
    </div>
);

export default Header;