import React, { Component } from 'react';
import api from '../../services/api';
import { logout } from '../../services/auth';

import './dashboard.css';

import Cadastro from '../../components/Cadastro/Cadastro';
import Modal from '../../components/Modal/Modal';
import Header from '../../components/Header/Header';

export default class Dashboard extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1,
        show: false
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/product');
        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo });
    };

    onLogoutClick = () => {
        logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <main>
                <Header onLogoutClick={this.onLogoutClick} />
                <div className='dashboard'>

                    <div className='bloco'>
                        <h1>PEDIDO</h1>
                    </div>

                    <div className='bloco' onClick={this.showModal}>
                        <h1>ENTRADA</h1>
                        <Modal show={this.state.show} >
                            <Cadastro handleClose={this.hideModal} />
                        </Modal>
                    </div>

                    <div className='bloco'>
                        <h1>ESTOQUE</h1>
                    </div>
                </div>
            </main>
        );
    }
}