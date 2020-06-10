import React, { Component } from 'react';
import './Header.css';

import logo from '../../images/logo.jpeg';
import { logout } from '../../services/auth';

export default class Header extends Component {

    onLogoutClick() {
        logout();
        this.props.history.push("/");        
    }

    render() {
        return (
            <div className='main-header'>
                <div >
                    <img src={logo} alt="Avatar" className="avatar" />
                </div>
                <button className='logout-button' onClick={this.onLogoutClick}>Sair</button>
            </div>
        );
    }
}