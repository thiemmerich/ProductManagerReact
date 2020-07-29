import React, { Component } from 'react';
import api from '../../services/api';

export default class Pedidos extends Component {

    state = {
        pedidos: [],
    }

    componentDidMount() {
        this.loadData(1);
    }

    loadData = async (pageNumber) => {
        let recordsPerPage = 10;

        const response = await api.get('/pedido/' + recordsPerPage + '/page/' + pageNumber);

        console.log(response);

        this.setState({
            pedidos: response.data.docs
        });
    };

    render() {
        return (
            <div className='pedidos-main'>
                <div className='header'>
                    <h3>Numero do pedido</h3>
                    <input placeholder='111111' />
                </div>
                <div className='body'>
                    <div className='product-list'>
                        {this.state.pedidos.map(
                            pedido => (
                                <h1 key={pedido.idPedido}>
                                    {pedido.nomeCliente}
                                    {pedido.valorTotal}
                                </h1>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}