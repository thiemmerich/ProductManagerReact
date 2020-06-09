import React, { Component } from 'react';
import api from '../../services/api';
import './Cadastro.css';


export default class Cadastro extends Component {

    state = {
        name: "",
        password: "",
        token: "",
        status: "",
        result: {}
    }

    submitCadastro = async e => {

    }

    render() {

        return (
            <div className='cadastro-main'>
                <form onSubmit={this.submitCadastro}>
                    <div className='container'>
                        <label ><b>Produto</b></label>
                        <input className='text-field' placeholder='Nome do produto' />
                        <label ><b>Descrição</b></label>
                        <input className='text-field' placeholder='Descrição' />
                        <div className='colunm-2rows'>
                            <div>
                                <label ><b>Tamanho</b></label>
                                <input className='text-field-2' placeholder='Tamanho' />
                            </div>
                            <div>
                                <label ><b>Tipo</b></label>
                                <input className='text-field-2' placeholder='Tipo' />
                            </div>
                        </div>
                        <label ><b>Marca</b></label>
                        <input className='text-field' placeholder='Marca' />
                        <label ><b>Preço</b></label>
                        <input className='text-field' placeholder='Preço' />
                        <div className='button-div'>
                            <button type='submit'>Salvar</button>
                            <button>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div >

        );
    }
}