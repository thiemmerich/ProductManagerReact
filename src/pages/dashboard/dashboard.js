import React, { Component } from 'react';
import api from '../../services/api';
import { logout } from '../../services/auth';

import './dashboard.css';

import estoque from '../../images/opened_box.png';
import entrada from '../../images/box.png';
import pedido from '../../images/supermarket.png';

import Entrada from '../../components/Entrada/Entrada';
import Estoque from '../../components/Estoque/Estoque';
import Cadastro from '../../components/Cadastro/Cadastro';
import Modal from '../../components/Modal/Modal';
import Header from '../../components/Header/Header';
import Movimentacao from '../../components/Movimentacao/Movimentacao';

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
        if (this.state.modalContent === 'cadastro') {
            return <Cadastro />
        }
        if (this.state.modalContent === 'entrada') {
            return <Entrada />
        }
        if (this.state.modalContent === 'estoque') {
            return <Estoque />
        }
        if (this.state.modalContent === 'movimentacao') {
            return <Movimentacao geraRelorio />
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

                    <div className='bloco' >
                        <img src={pedido} alt="Avatar" className="avatar" />
                        <h1>Novo pedido</h1>
                    </div>

                    <div className='bloco' onClick={() => this.showModal('cadastro', 'Cadastro de produto')}>
                        <img src={entrada} alt="Avatar" className="avatar" />
                        <h1>Cadastro de produtos</h1>
                    </div>

                    <div className='bloco' onClick={() => this.showModal('entrada', 'Entrada de produto')}>
                        <img src={entrada} alt="Avatar" className="avatar" />
                        <h1>Entrada de produtos</h1>

                    </div>

                    <div className='bloco' onClick={() => this.showModal('estoque', 'Estoque')}>
                        <img src={estoque} alt="Avatar" className="avatar" />
                        <h1>Estoque</h1>
                    </div>

                    <div className='bloco' onClick={() => this.showModal('movimentacao', 'Movimentacao')}>
                        <img src={estoque} alt="MOVIMENTAO" className="MOVIMENTAO" />
                        <h1>Movimentação</h1>
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