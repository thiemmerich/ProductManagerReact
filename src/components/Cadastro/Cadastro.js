import React, { Component } from 'react';
import api from '../../services/api';
import './Cadastro.css';

import { getToken } from '../../services/auth';


export default class Cadastro extends Component {

    state = {
        showHideClassName: "",
        nome: "",
        descricao: "",
        tamanho: "",
        tipo: "",
        marca: "",
        preco: "",
        showErrorClassName: 'hideError',
        error: "ERRO",
        result: {}
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
            this.setState({ showErrorClassName: 'showSucess',error: "Salvo com sucesso!"});

        } catch (err) {
            setTimeout(this.hiddingAlert, 3000);
            this.setState({ showErrorClassName: 'showError',error: "ERRO: " + err });
        }
    }

    render() {

        return (
            <main className='cadastro-main'>
                <p className={this.state.showErrorClassName}>{this.state.error}</p>
                <form>
                    <div className='formTitle'>
                        <h1>Cadastro de produto</h1>
                        <button>X</button>
                    </div>
                    <div className='container'>

                        <label ><b>Produto</b></label>
                        <input
                            className='text-field'
                            placeholder='Nome do produto'
                            onChange={e => this.setState({ nome: e.target.value })}
                        />
                        <label ><b>Descrição</b></label>
                        <input
                            className='text-field'
                            placeholder='Descrição'
                            onChange={e => this.setState({ descricao: e.target.value })}
                        />
                        <label ><b>Tamanho</b></label>
                        <input
                            className='text-field'
                            placeholder='Tamanho'
                            onChange={e => this.setState({ tamanho: e.target.value })}
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
                        <label ><b>Preço</b></label>
                        <input
                            className='text-field'
                            placeholder='Preço'
                            onChange={e => this.setState({ preco: e.target.value })}
                        />
                        <div className='button-div'>
                            <button onClick={this.submitCadastro}>Salvar</button>
                        </div>
                    </div>
                </form>
            </main >

        );
    }
}