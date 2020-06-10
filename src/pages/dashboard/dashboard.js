import React, { Component } from 'react';
import api from '../../services/api';
import { logout } from '../../services/auth';

import './dashboard.css';

import estoque from '../../images/opened_box.png';
import entrada from '../../images/box.png';
import pedido from '../../images/supermarket.png';

import Cadastro from '../../components/Cadastro/Cadastro';
import Estoque from '../../components/Estoque/Estoque';
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
                        <img src={pedido} alt="Avatar" className="avatar" />
                        <h1>Novo pedido</h1>
                    </div>

                    <div className='bloco' onClick={this.showModal}>
                        <img src={entrada} alt="Avatar" className="avatar" />
                        <h1>Entrada de produtos</h1>
                        <Modal show={this.state.show} >
                            <Cadastro handleClose={this.hideModal} />
                        </Modal>
                    </div>

                    <div className='bloco'>
                        <img src={estoque} alt="Avatar" className="avatar" />
                        <h1>Estoque</h1>
                    </div>
                </div>
            </main>
        );
    }
}