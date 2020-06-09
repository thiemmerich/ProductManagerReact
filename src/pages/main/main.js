import React, { Component } from 'react';
import api from '../../services/api';

import './main.css';

import Cadastro from '../../components/Cadastro/Cadastro';
import Modal from '../../components/Cadastro/Modal';

export default class Main extends Component {

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
            <div className='dashboard'>
                <div className='bloco' onClick={this.showModal}>
                    <Modal show={this.state.show} handleClose={this.hideModal} >
                        <Cadastro />
                    </Modal>
                </div>
                <div className='bloco'>

                </div>
                <div className='bloco'>

                </div>
            </div>
        );
    }
}