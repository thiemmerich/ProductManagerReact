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
        currentPage: 1,
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

    loadProductsFromApi = async (likeName) => {
        const productsFromApi = await api.get('product/' + likeName);

        this.setState({
            products: productsFromApi.data
        });

        console.log(this.state.products);

        this.showDropDown();
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
                //await api.post('product', produto);
                //alert(produto.preco);
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

    render() {
        return (
            <main className='entrada-main'>
                <p className={this.state.showErrorClassName}>{this.state.error}</p>
                <form>
                    <div className='entrada-container'>
                        <label ><b>Nome do produto</b></label>
                        <input
                            className='text-field-drop'
                            placeholder='Nome do produto'
                            value={this.state.product.nome}
                            onChange={e => this.loadProductsFromApi(e.target.value)}
                        />
                        <div id="myDropdown" class="dropdown-content">
                            {this.state.products.map(
                                product => (
                                    <a
                                        onClick={e => this.saveSelectedProduct(product)}
                                        key={product.id}
                                    >
                                        {product.nome}
                                    </a>
                                )
                            )}
                        </div>

                        <label ><b>Descrição</b></label>
                        <input
                            className='fixedValue'
                            placeholder='Descrição'
                            readonly='readonly'
                            value={this.state.product.descricao}
                        />

                        <label ><b>Tipo</b></label>
                        <input
                            className='fixedValue'
                            placeholder='Tipo'
                            readonly='readonly'
                            value={this.state.product.tipo}
                        />

                        <label ><b>Marca</b></label>
                        <input
                            className='fixedValue'
                            placeholder='Marca'
                            readonly='readonly'
                            value={this.state.product.marca}
                        />

                        <label ><b>Valor</b></label>
                        <CurrencyInput
                            className='fixedValue'
                            decimalSeparator=","
                            thousandSeparator="."
                            prefix="R$"
                            readonly='readonly'
                            value={this.state.product.preco}
                        />

                        <div className='input-2rows'>
                            <div>
                                <label ><b>Tamanho</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Tamanho'
                                    onChange={e => this.setState({ tamanho: e.target.value })}
                                />
                            </div>
                            <div>
                                <label ><b>Quantidade</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Quantidade'
                                    onChange={e => this.setState({ quantidade: e.target.value })}
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