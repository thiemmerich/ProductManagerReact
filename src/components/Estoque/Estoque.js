import React, { Component } from 'react';
import api from '../../services/api';
import './Estoque.css';

import { getToken } from '../../services/auth';




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
        produtos: [],

    }

    componentDidMount() {
        this.loadRelatorioEstoque();
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    submitCadastro = async e => {
        e.preventDefault();

        const token = getToken();
        const produto = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            tamanho: this.state.tamanho,
            tipo: this.state.tipo,
            marca: this.state.marca,
            preco: this.state.preco
        }

        try {
            const response = await api.post('product', produto);

            setTimeout(this.hiddingAlert, 3000);
            this.setState({ showErrorClassName: 'showSucess', error: "Salvo com sucesso!" });

        } catch (err) {
            setTimeout(this.hiddingAlert, 3000);
            this.setState({ showErrorClassName: 'showError', error: "ERRO: " + err });
        }
    }

    loadRelatorioEstoque = async () => {
        const response = await api.get('/product');
        this.setState({ produtos: response.data.docs });
    };


    generateTableHeader = (value) => {
        var keyVal = 'th_' + value;
        return (
            <th key={keyVal}>
                {value}
            </th>
        )
    }


    getTdFromTemplateKey = (templateKey, produto) => {
        return (
            <td>{produto.templateKey}</td>
        )
    }


    mapProductTableData = (produto) => {
        let templateKeys = Object.keys(ProductTemplate);
        return (
            <tr key={'product_' + produto.id} >
                {
                    templateKeys.map((elem) => {
                        return (
                            <td>{eval("produto." + elem)}</td>
                        );
                    })
                }
            </tr>
        )
    }


    render() {

        return (
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
        );
    }
}