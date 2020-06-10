import React, { Component } from 'react';
import './Header.css';

import logo from '../../images/logo.jpeg';

const Header = ({ onLogoutClick }) => {

    return (
        <div className='main-header'>
            <div >
                <img src={logo} alt="Avatar" className="avatar" />
            </div>
            <button className='logout-button' onClick={onLogoutClick}>Sair</button>
        </div>
    );
}

export default Header;