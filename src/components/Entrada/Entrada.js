// @ts-nocheck
import React, { Component } from 'react';
import api from '../../services/api';
import './Entrada.css';
import CurrencyInput from 'react-currency-input';

export default class Entrada extends Component {

    state = {
        showHideClassName: "",
        showErrorClassName: 'hideError',
        error: "ERRO",
        result: {},
        currentPage: 1,
        products: []
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

    submitCadastro = async e => {
        /*e.preventDefault();

        const produto = {
        }

        const { nome, descricao, tamanho, tipo, marca, preco } = this.state;

        if (!nome || !descricao || !tamanho || !tipo || !marca || !preco) {
            setTimeout(this.hiddingAlert, 3000);
            this.setState({ showErrorClassName: 'showError', error: "Preencha todos os campos!" });
        } else {
            try {
                await api.post('product', produto);
                //alert(produto.preco);
                setTimeout(this.hiddingAlert, 3000);
                this.setState({ showErrorClassName: 'showSucess', error: "Salvo com sucesso!" });

            } catch (err) {
                setTimeout(this.hiddingAlert, 3000);
                this.setState({ showErrorClassName: 'showError', error: "ERRO: " + err });
            }
        }*/
    }

    showDropDown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
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
                            onChange={e => this.loadProductsFromApi(e.target.value)}
                        />
                        <div id="myDropdown" class="dropdown-content">
                            {this.state.products.map(
                                product => (
                                    <a key={product.id}>{product.nome}</a>
                                )
                            )}
                        </div>

                        <label ><b>Descrição</b></label>
                        <label>
                            {this.state.products.descricao}
                        </label>

                        <label ><b>Tipo</b></label>
                        <label>
                            {this.state.products.tipo}
                        </label>
                        <label ><b>Marca</b></label>
                        <label>
                            {this.state.products.marca}
                        </label>
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
                                <label ><b>Valor</b></label>
                                <label>
                                    {this.state.valor}
                                </label>
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