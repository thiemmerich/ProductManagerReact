// @ts-nocheck
import React, { Component } from 'react';
import api from '../../services/api';
import './Cadastro.css';
import CurrencyInput from 'react-currency-input';

export default class Cadastro extends Component {

    state = {
        showHideClassName: "",
        showErrorClassName: 'hideError',
        error: "ERRO",
        result: {},
        currentPage: 1,
        products: [],
        product: {
            codigo: '',
            nome: '',
            descricao: '',
            tamanho: '',
            tipo: '',
            marca: '',
            preco: 0
        }
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    handleChange = (event, maskedvalue, floatvalue) => {
        this.handleInputChange('preco', floatvalue);
    }

    handleInputChange = (field, value) => {
        var produto = this.state.product;
        produto[field] = value;

        this.setState({
            product: produto
        });
    }

    submitCadastro = async e => {
        e.preventDefault();

        const { codigo, nome, descricao, tamanho, tipo, marca, preco } = this.state.product;

        //console.log(this.state.product);

        if (!codigo || !nome || !descricao || !tamanho || !tipo || !marca || !preco) {
            console.log("FALTAM CAMPOS: " + codigo, nome, descricao, tamanho, tipo, marca, preco);
            setTimeout(this.hiddingAlert, 3000);
            this.setState({ showErrorClassName: 'showError', error: "Preencha todos os campos!" });
        } else {
            try {
                await api.post('product', this.state.product);
                //alert(produto.preco);
                setTimeout(this.hiddingAlert, 3000);
                this.setState({ showErrorClassName: 'showSucess', error: "Salvo com sucesso!" });

            } catch (err) {
                setTimeout(this.hiddingAlert, 3000);
                this.setState({ showErrorClassName: 'showError', error: "ERRO: " + err });
                console.log(err.errorMsg);
            }
        }
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
                this.setState({
                    products: [],
                    product: {}
                });
            }
        }
    }

    showDropDown = () => {
        document.getElementById("myDropdown").style.display = "block";
    }

    hideDropDown = () => {
        document.getElementById("myDropdown").style.display = "none";
    }

    saveSelectedProduct = (product) => {
        this.setState({
            product: product
        });
        this.hideDropDown();
    }

    loadProductsFromApiByCodigo = async (codigo) => {

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

    render() {
        return (
            <main className='cadastro-main'>
                <p className={this.state.showErrorClassName}>{this.state.error}</p>
                <form>
                    <div className='cadastro-container'>
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
                                    className='text-field'
                                    placeholder='Nome do produto'
                                    value={this.state.product.nome}
                                    ref='nome'
                                    onChange={e => this.handleInputChange('nome', e.target.value)}
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
                        <textarea
                            className='text-field'
                            placeholder='Descrição'
                            rows="4"
                            cols="50"
                            value={this.state.product.descricao}
                            ref='descricao'
                            onChange={e => this.handleInputChange('descricao', e.target.value)}
                        />
                        <label ><b>Tipo</b></label>
                        <input
                            className='text-field'
                            placeholder='Tipo'
                            value={this.state.product.tipo}
                            ref='tipo'
                            onChange={e => this.handleInputChange('tipo', e.target.value)}
                        />
                        <label ><b>Marca</b></label>
                        <input
                            className='text-field'
                            placeholder='Marca'
                            value={this.state.product.marca}
                            ref='marca'
                            onChange={e => this.handleInputChange('marca', e.target.value)}
                        />
                        <div className='input-2rows'>
                            <div>
                                <label ><b>Tamanho</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Tamanho'
                                    value={this.state.product.tamanho}
                                    ref='tamanho'
                                    onChange={e => this.handleInputChange('tamanho', e.target.value)}
                                />
                            </div>
                            <div>
                                <label ><b>Valor</b></label>
                                <CurrencyInput
                                    className='text-field'
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    prefix="R$"
                                    value={this.state.product.preco}
                                    ref='valor'
                                    onChangeEvent={this.handleChange}
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