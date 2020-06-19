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
    recordsPerPage = 8;

    state = {
        dataItems: [],

    }
    componentDidMount() {
        this.loadRelatorioEstoque(1);
    }

    loadRelatorioEstoque = async (pageNumber) => {
        console.log('/estoque/'+this.recordsPerPage+'/page/'+pageNumber);
        const response = await api.get('/estoque/'+this.recordsPerPage+'/page/'+pageNumber);
        this.setState({ dataItems: response.data.docs });
        console.log(response);
        return response.data;
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
                />
            </>
        );
    }
}