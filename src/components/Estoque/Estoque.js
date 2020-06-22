import React, { Component } from 'react';
import api from '../../services/api';
import './Estoque.css';

import Relatorio from '../Relatorio/Relatorio';

let ProductTemplate = {
    idProduto: 'Id',
    Product_nome: 'Nome',
    Product_marca: 'Marca',
    tamanho: 'Tamanho',
    quantidade: 'Qtde',
    createdAt: 'Criacao',
    updatedAt: 'Atualizacao',
}

export default class Estoque extends Component {
    recordsPerPage = 7;

    state = {
        dataItems: [],

    }
    componentDidMount() {
        this.loadRelatorioEstoque(1);
    }

    loadRelatorioEstoque = async (pageNumber) => {
        //console.log('/estoque/'+this.recordsPerPage+'/page/'+pageNumber);
        const response = await api.get('/estoque/'+this.recordsPerPage+'/page/'+pageNumber);
        this.setState({ dataItems: response.data.docs });
        //console.log(response);
        return response.data;
    };
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