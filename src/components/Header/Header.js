import React from 'react';
import './Header.css';

import logo from '../../images/logo.jpeg';

const Header = ({ onLogoutClick }) => {

    return (
        <div className='main-header'>
            <div >
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <button className='logout-button' onClick={onLogoutClick}>Sair</button>
        </div>
    );
}

export default Header;