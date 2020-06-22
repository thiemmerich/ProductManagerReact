// @ts-nocheck
import React, { Component } from 'react';
import api from '../../services/api';
import './Cadastro.css';
import CurrencyInput from 'react-currency-input';

export default class Cadastro extends Component {

    state = {
        showHideClassName: "",
        codigo: '',
        nome: "",
        descricao: "",
        tamanho: "",
        tipo: "",
        marca: "",
        preco: 0.00,
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

    submitCadastro = async e => {
        e.preventDefault();

        const produto = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            tamanho: this.state.tamanho,
            tipo: this.state.tipo,
            marca: this.state.marca,
            preco: this.state.preco
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
                                    value={this.state.codigo}
                                    onChange={e => this.setState({ codigo: e.target.value.replace(/\D/, '') })}
                                />
                            </div>
                            <div className='input-nome'>
                                <label ><b>Nome do produto</b></label>
                                <input
                                    className='text-field'
                                    placeholder='Nome do produto'
                                    onChange={e => this.setState({ nome: e.target.value })}
                                />
                            </div>
                        </div>
                        <label ><b>Descrição</b></label>
                        <textarea
                            className='text-field'
                            placeholder='Descrição'
                            rows="4"
                            cols="50"
                            onChange={e => this.setState({ descricao: e.target.value })}
                        />
                        <label ><b>Tipo</b></label>
                        <input
                            className='text-field'
                            placeholder='Tipo'
                            onChange={e => this.setState({ tipo: e.target.value })}
                        />
                        <label ><b>Marca</b></label>
                        <input
                            className='text-field'
                            placeholder='Marca'
                            onChange={e => this.setState({ marca: e.target.value })}
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
                                <label ><b>Valor</b></label>
                                <CurrencyInput
                                    className='text-field'
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    prefix="R$"
                                    value={this.state.preco}
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