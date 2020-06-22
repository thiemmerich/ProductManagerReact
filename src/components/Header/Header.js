import React, { Component } from 'react';
import './Header.css';

import logo from '../../images/logo.jpeg';
import { getUser, getEmail } from '../../services/auth';

export default class Header extends Component { //= ({ onLogoutClick }) => {

    state = {
        usuario: '',
        email: ''
    }

    componentDidMount() {
        this.setState({
            usuario: getUser(),
            email: getEmail()
        });
    }

    render() {
        return (
            <div className='main-header'>
                <div className='div_logo'>
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className='div_button'>
                    <div className='dados_usuario'>
                        <span>Usuário: {this.state.usuario} </span>
                        <span>Email: {this.state.email} </span>
                    </div>
                    <div>
                        <button className='logout-button' onClick={this.props.onLogoutClick}>Sair</button>
                    </div>
                </div>
            </div>
        );
    }
}

//export default Header;