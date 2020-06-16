import React, { Component } from 'react';
import api from '../../services/api';
import './Estoque.css';

import { getToken } from '../../services/auth';
import Relatorio from '../Relatorio/Relatorio';
import Header from '../Header/Header';



let ProductTemplate = {
    id: 0,
    nome: '',
    descricao: '',
    tamanho: '',
    tipo: '',
    marca: '',
    preco: '',
    criacao: '',
    atualizacao: ''
}

export default class Estoque extends Component {


    state = {
        dataItems: [],

    }

    componentDidMount() {
        this.loadRelatorioEstoque(1);
    }

    loadRelatorioEstoque = async (pageNumber) => {
        const response = await api.get('/product');
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
<<<<<<< HEAD
            <>
                <Header />
                <Relatorio generateTableDataFunction={this.loadRelatorioEstoque}
                    dataTemplate={ProductTemplate}
                    getDataItemsFromState={this.serveState}
                />
            </>
=======
            <div className='container'>
                <div className='formTitle'>
                    <h1>Estoque</h1>
                    <button onClick={this.props.handleClose}>X</button>
                </div>
                <div className='relatorio'>
                    <table id='table_products'>
                        {Object.keys(ProductTemplate).map(this.generateTableHeader)}
                        {this.state.produtos.map(this.mapProductTableData)}
                    </table>
                </div>
            </div>
>>>>>>> e6447aca6efd0ae0d683c64e46c1bed4bf25e2a4
        );
    }
}