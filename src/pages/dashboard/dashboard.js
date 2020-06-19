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
        showModal: 'modal display-none',
        modalContent: '',
        titleName: ''
    }

    showModal = (modalContent, modalName) => {
        this.setState({
            showModal: 'modal display-block',
            modalContent: modalContent,
            titleName: modalName
        });
    }

    ModalContent = () => {
        if (this.state.modalContent === 'saida') {
            return <Cadastro />
        }
        if (this.state.modalContent === 'entrada') {
            return <Cadastro />
        }
        if (this.state.modalContent === 'estoque') {
            return <Estoque />
        }
    }

    hideModal = () => {
        this.setState({ showModal: 'modal display-none' });
        console.log('Hiding Entrada Modal');
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

                    <div className='bloco' onClick={() => this.showModal('entrada', 'Cadastro de produtos')}>
                        <img src={entrada} alt="Avatar" className="avatar" />
                        <h1>Entrada de produtos</h1>

                    </div>

                    <div className='bloco' onClick={() => this.showModal('estoque', 'Estoque')}>
                        <img src={estoque} alt="Avatar" className="avatar" />
                        <h1>Estoque</h1>
                    </div>

                    <Modal
                        show={this.state.showModal}
                        titleName={this.state.titleName}
                        handleClose={this.hideModal}
                    >
                        {this.ModalContent()}

                    </Modal>
                </div>
            </main>
        );
    }
}

/*
    {this.state.modalContent === 'saida' && <Cadastro />}
                        {this.state.modalContent === 'entrada' && <Cadastro />}
                        {this.state.modalContent === 'estoque' && <Estoque />}
*/