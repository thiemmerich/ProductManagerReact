// @ts-nocheck
import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import './Pedido.css';
import Produto from '../Produto/Produto';
import api from '../../services/api';

export default class Pedido extends Component {

    state = {
        showErrorClassName: 'hideError',
        product: {},
        products: [],
        selectedProducts: [],
        tamanho: '',
        qtde: 0
    }

    cleanObjects = () => {
        this.setState({
            products: [],
            product: {},
            tamanho: '',
            qtde: 0
        });

        this.refs.codigo.value = '';
        this.refs.nome.value = '';
        this.refs.descricao.value = '';
        this.refs.tamanho.value = '';
        this.refs.qtde.value = 0;
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
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
            console.log("ERRO - Pedido - Erro ao buscar produtos - " + err.data);
        }
    }

    loadProductsFromApiByCodigo = async (codigo) => {

        this.cleanObjects();

        var produto = this.state.product;
        produto.codigo = codigo;

        this.setState({
            product: produto
        });

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
            })
            .catch((err) => {
                //console.log("ERRO - Pedido - Erro ao buscar produtos - " + err);
                setTimeout(this.hiddingAlert, 3000);
                if (err.response) {
                    console.log("RESPONSE: " + err.response.data.error + " " + err.response.data.status);
                    if (err.response.data.status === 401) {
                        this.setState({ showErrorClassName: "showError", error: "Sessão expirada! Favor faça login novamente." });
                    }
                } else if (err.request) {
                    console.log("REQUEST: " + err.request);
                    //this.setState({ showErrorClassName: "showError", error: "Erro ao conectar ao servidor: " + err.request });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('error', err.message);
                    //this.setState({ showErrorClassName: "showError", error: "Erro: " + err.message });
                }
            });
    }

    saveSelectedProduct = (product) => {
        this.setState({
            product: product
        });
        this.hideDropDown();
    }

    showDropDown = () => {
        document.getElementById("myDropdown").style.display = "block";
    }

    hideDropDown = () => {
        document.getElementById("myDropdown").style.display = "none";
    }

    storeProsuct = () => {

        const prod = this.state.product;

        const novoProduto = {
            id: prod.id,
            nome: prod.nome,
            codigo: prod.codigo,
            descricao: prod.descricao,
            preco: prod.preco,
            tamanho: this.state.tamanho,
            quantidade: this.state.qtde
        }

        this.setState({ selectedProducts: [...this.state.selectedProducts, novoProduto] });
        this.cleanObjects();
    }

    changeSelectedProduct = (selectedProduct) => {
        //alert("Change: " + selectedProduct.nome);
        this.setState({
            product: selectedProduct,
            tamanho: selectedProduct.tamanho,
            qtde: selectedProduct.quantidade
        });
        this.handleDeleteItem(selectedProduct.id);
    }

    handleDeleteItem = (id) => {
        const prevProducts = this.state.selectedProducts.filter(item => item.id !== id);
        this.setState({
            selectedProducts: prevProducts
        });
    }

    sendSelectedProductsToApi = () => {

    }

    render() {
        return (
            <main className='pedido-main'>
                <p className={this.state.showErrorClassName}>{this.state.error}</p>
                <form>
                    <div className='pedido-container'>
                        <div className='input-2rows'>
                            <div className='input-cod'>
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
                                            <h3
                                                onClick={e => this.saveSelectedProduct(product)}
                                                key={product.id}
                                            >
                                                {product.nome}
                                            </h3>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='input-2rows'>
                            <div>
                                <label ><b>Descrição</b></label>
                                <input
                                    className='fixedValue'
                                    placeholder='Descrição'
                                    readOnly={true}
                                    ref='descricao'
                                    value={this.state.product.descricao}
                                />
                            </div>
                            <div>
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
                            </div>
                        </div>
                        <div className='input-3rows'>
                            <div className='div-tamanho'>
                                <label ><b>Tamanho</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Tamanho'
                                    value={this.state.tamanho}
                                    ref='tamanho'
                                    onChange={e => this.setState({ tamanho: e.target.value })}
                                />
                            </div>
                            <div>
                                <label ><b>Quantidade</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Quantidade'
                                    value={this.state.qtde}
                                    ref='qtde'
                                    onChange={e => this.setState({ qtde: e.target.value.replace(/\D/, '') })}
                                />
                            </div>
                            <input
                                type='button'
                                value='Adicionar'
                                className='add-button'
                                onClick={() => { this.storeProsuct() }}
                            />
                        </div>
                        <div className='product-list'>
                            {this.state.selectedProducts.map(
                                product => (
                                    <Produto
                                        key={product.id}
                                        produto={product}
                                        handleDelete={this.handleDeleteItem}
                                        handleChange={this.changeSelectedProduct}
                                    />
                                )
                            )}
                        </div>
                        <div className='button-div'>
                            <button
                                onClick={this.sendSelectedProductsToApi}
                            >Salvar</button>
                        </div>
                    </div>
                </form>
            </main >
        );
    }
}