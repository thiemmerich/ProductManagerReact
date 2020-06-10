import React, { Component } from 'react';
import api from '../../services/api';

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

    render() {
        const { products } = this.state;

        return (
            <main>
                <Header />
                <div className='dashboard'>
                    <div className='bloco'>

                    </div>
                    <div className='bloco' onClick={this.showModal}>
                        <Modal show={this.state.show} handleClose={this.hideModal} >
                            <Cadastro />
                        </Modal>
                    </div>
                    <div className='bloco'>

                    </div>
                </div>
            </main>
        );
    }
}