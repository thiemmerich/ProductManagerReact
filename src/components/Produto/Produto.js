// @ts-nocheck
import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import './Produto.css';

export default class Produto extends Component {

    state = {
        valorUnitario: this.props.produto.preco,
        valorTotal: (this.props.produto.preco * this.props.produto.quantidade)
    }

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
                    <div>
                        <h3>Descrição: </h3>
                        <h3>{this.props.produto.descricao}</h3>
                    </div>
                    <div>
                        <h3>Valor Unitario: </h3>
                        <CurrencyInput
                            className='currency-field'
                            decimalSeparator=","
                            thousandSeparator="."
                            prefix="R$"
                            readOnly={true}
                            ref='valor'
                            value={this.state.valorUnitario}
                        />
                    </div>
                    <div>
                        <h3>Valor Total: </h3>
                        <CurrencyInput
                            className='currency-field'
                            decimalSeparator=","
                            thousandSeparator="."
                            prefix="R$"
                            readOnly={true}
                            ref='valor'
                            value={this.state.valorTotal}
                        />
                    </div>
                    <div>
                        <h3>Tamanho: </h3>
                        <h3>{this.props.produto.tamanho}</h3>
                    </div>
                    <div>
                        <h3>Quantidade: </h3>
                        <h3>{this.props.produto.quantidade}</h3>
                    </div>
                </div>
            </div>
        );
    }
}