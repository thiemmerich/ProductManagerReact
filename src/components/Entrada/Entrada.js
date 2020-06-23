// @ts-nocheck
import React, { Component } from 'react';
import api from '../../services/api';
import './Entrada.css';
import CurrencyInput from 'react-currency-input';
import Movimentacao from '../Movimentacao/Movimentacao';
import { getUserID } from '../../services/auth'

export default class Entrada extends Component {

    state = {
        showHideClassName: "",
        showErrorClassName: 'hideError',
        error: "ERRO",
        result: {},
        products: [],
        product: {},
        tamanho: '',
        quantidade: ''
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    handleChange = (event, maskedvalue, floatvalue) => {
        this.setState({ preco: floatvalue });
    }

    cleanObjects = () => {
        this.setState({
            products: [],
            product: {}
        });
    }

    loadProductsFromApi = async (likeName) => {

        this.cleanObjects();

        try {
            await api.get(`product/${likeName}`)
                .then((productsFromApi) => {
                    if (productsFromApi.data.length > 0) {
                        this.setState({
                            products: productsFromApi.data
                        });

                        console.log(this.state.products);

                        this.showDropDown();
                    }
                });

        } catch (err) {
            console.log("ERRO - Cadastro - Erro ao buscar produtos - " + err);
        }
    }

    loadProductsFromApiByCodigo = async (codigo) => {

        this.cleanObjects();

        var produto = this.state.product;
        produto.codigo = codigo;

        this.setState({
            product: produto
        });

        try {
            await api.get(`product/cod/${codigo}`)
                .then((productsFromApi) => {

                    if (productsFromApi.data.length > 0) {
                        this.setState({
                            products: productsFromApi.data
                        });

                        if (this.state.products.length > 0) {
                            this.showDropDown();
                        }
                    }
                });

        } catch (err) {
            console.log("ERRO - Cadastro - Erro ao buscar produtos - " + err);
        }
    }

    saveSelectedProduct = (product) => {
        this.setState({
            product: product
        });
        this.hideDropDown();
    }

    submitCadastro = async e => {
        e.preventDefault();

        const estoque = {
            idProduto: this.state.product.id,
            tamanho: this.state.tamanho,
            quantidade: this.state.quantidade
        }

        const { nome } = this.state.product;

        if (!nome || !this.state.tamanho || !this.state.quantidade) {
            setTimeout(this.hiddingAlert, 3000);
            this.setState({ showErrorClassName: 'showError', error: "Preencha todos os campos!" });
        } else {
            try {

                let movimento = {
                    idProduto: this.state.product.id,
                    quantidade: parseInt(this.state.quantidade),
                    valor: this.state.product.preco,
                    tipo: 'entrada',
                    usuario: parseInt(getUserID()),
                    tamanho: this.state.tamanho,
                    devolucao: false,
                }
                let sendMovimentacao = Movimentacao(movimento);

                console.log(sendMovimentacao);
                sendMovimentacao();

                setTimeout(this.hiddingAlert, 3000);
                this.setState({ showErrorClassName: 'showSucess', error: "Salvo com sucesso!" });

            } catch (err) {
                setTimeout(this.hiddingAlert, 3000);
                this.setState({ showErrorClassName: 'showError', error: "ERRO: " + err });
            }
        }
    }

    showDropDown = () => {
        document.getElementById("myDropdown").style.display = "block";
    }

    hideDropDown = () => {
        document.getElementById("myDropdown").style.display = "none";
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hideCallback !== nextProps.hideCallback) {
            if (nextProps.hideCallback) {
                this.refs.codigo.value = '';
                this.refs.nome.value = '';
                this.refs.descricao.value = '';
                this.refs.tipo.value = '';
                this.refs.marca.value = '';
                this.refs.tamanho.value = '';
                this.refs.qtde.value = '';
                this.cleanObjects();
            }
        }
    }

    render() {
        return (
            <main className='entrada-main'>
                <p className={this.state.showErrorClassName}>{this.state.error}</p>
                <form>
                    <div className='entrada-container'>
                        <div className='input-2rows'>
                            <div className='input-codigo'>
                                <label ><b>Codigo</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Codigo'
                                    type="text"
                                    value={this.state.product.codigo}
                                    ref='codigo'
                                    onChange={e => this.loadProductsFromApiByCodigo(e.target.value.replace(/\D/, ''))}
                                />
                            </div>
                            <div className='input-nome'>
                                <label ><b>Nome do produto</b></label>
                                <input
                                    className='text-field-drop'
                                    placeholder='Nome do produto'
                                    value={this.state.product.nome}
                                    ref='nome'
                                    onChange={e => this.loadProductsFromApi(e.target.value)}
                                />
                                <div id="myDropdown" className="dropdown-content">
                                    {this.state.products.map(
                                        product => (
                                            <a onClick={e => this.saveSelectedProduct(product)}
                                                key={product.id}
                                            >
                                                {product.nome}
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        <label ><b>Descrição</b></label>
                        <input
                            className='fixedValue'
                            placeholder='Descrição'
                            readOnly={true}
                            ref='descricao'
                            value={this.state.product.descricao}
                        />

                        <label ><b>Tipo</b></label>
                        <input
                            className='fixedValue'
                            placeholder='Tipo'
                            readOnly={true}
                            ref='tipo'
                            value={this.state.product.tipo}
                        />

                        <label ><b>Marca</b></label>
                        <input
                            className='fixedValue'
                            placeholder='Marca'
                            readOnly={true}
                            ref='marca'
                            value={this.state.product.marca}
                        />

                        <label ><b>Valor</b></label>
                        <CurrencyInput
                            className='fixedValue'
                            decimalSeparator=","
                            thousandSeparator="."
                            prefix="R$"
                            readOnly={true}
                            ref='valor'
                            value={this.state.product.preco}
                        />

                        <div className='input-2rows'>
                            <div>
                                <label ><b>Tamanho</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Tamanho'
                                    ref='tamanho'
                                    onChange={e => this.setState({ tamanho: e.target.value })}
                                />
                            </div>
                            <div>
                                <label ><b>Quantidade</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Quantidade'
                                    value={this.state.quantidade}
                                    ref='qtde'
                                    onChange={e => this.setState({ quantidade: e.target.value.replace(/\D/, '') })}
                                />
                            </div>
                        </div>
                        <div className='button-div'>
                            <button onClick={this.submitCadastro}>Salvar</button>
                        </div>
                    </div>
                </form>
            </main >
        );
    }
}