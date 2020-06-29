// @ts-nocheck
import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import './Produto.css';

export default class Produto extends Component {

    handleDelete = () => {
        this.props.handleDelete(this.props.produto.id);
    }

    handleChange = () => {
        this.props.handleChange(this.props.produto);
    }

    render() {
        return (
            <div className='produto-main' onClick={() => { this.handleChange() }}>
                <div className='produto-header'>
                    <h1 className='position-1'>{this.props.produto.codigo}</h1>
                    <h1 className='position-2'>{this.props.produto.nome}</h1>
                    <input
                        type='button'
                        value='X'
                        id='delete-button'
                        className='position-1'
                        onClick={() => this.handleDelete()}
                    />
                </div>
                <div className='produto-body'>
                    <h3>Descrição: {this.props.produto.descricao}</h3>
                    <CurrencyInput
                        className='currency-field'
                        decimalSeparator=","
                        thousandSeparator="."
                        prefix="R$"
                        readOnly={true}
                        ref='valor'
                        value={this.props.produto.preco}
                    />
                    <h3>Tamanho: {this.props.produto.tamanho}</h3>
                    <h3>Quantidade: {this.props.produto.quantidade}</h3>
                </div>
            </div>
        );
    }
}