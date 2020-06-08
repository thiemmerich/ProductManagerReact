import React, { Component } from 'react';
import api from '../../services/api';

import './main.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1
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
            <div className='product-list'>
                {products.map( product => (
                    <article key={product._id}>
                        <strong>{product.nome}</strong>
                        <p>{product.descricao}</p>
                        <p>{product.tamanho}</p>
                        <p>{product.marca}</p>
                        <p>{product.preco}</p>
                        <a href=''>Acessar</a>
                    </article>
                ))}
                <div className='actions'>
                    <button>Anterior</button>
                    <button>Proximo</button>
                </div>
            </div>
        );
    }
}