import React, { Component } from 'react';
import api from '../../services/api';
import './Estoque.css';

import Relatorio from '../Relatorio/Relatorio';

let ProductTemplate = {
    idProduto: 0,
    Product_nome: '',
    Product_marca: '',
    tamanho: '',
    quantidade: '',
    createdAt: '',
    updatedAt: '',
    
}

export default class Estoque extends Component {
    state = {
        dataItems: [],

    }
    componentDidMount() {
        this.loadRelatorioEstoque(1);
    }

    loadRelatorioEstoque = async (pageNumber) => {
        const response = await api.get('/estoque');
        this.setState({ dataItems: response.data.docs });
        console.log("ESTOQUE: " + this.state.dataItems);
        return response.data.docs;
    };

    serveState = () => {
        console.log("Serve: " + this.state.dataItems);
        return this.state.dataItems;
    }



    render() {
        return (
            <>
                <Relatorio generateTableDataFunction={this.loadRelatorioEstoque}
                    dataTemplate={ProductTemplate}
                    getDataItemsFromState={this.serveState}
                />
            </>
        );
    }
}