import React, { Component } from 'react';
import api from '../../services/api';

import Relatorio from '../Relatorio/Relatorio';

import PropTypes from 'prop-types';

function Movimentacao(props) {

    let MovimentoTemplate = {
        idProduto: 'Id',
        Product_nome: 'Nome',
        Product_marca: 'Marca',
        quantidade: 'Qtde',
        quantidadeAnterior: "Anterior",
        valor: "Valor",
        tipo: "Tipo",
        dataHora: "DataHora",
        User_name: 'Usuario',
    }
    
    let loadData = async (pageNumber) => {
        let recordsPerPage = 10;
        //console.log('/estoque/'+this.recordsPerPage+'/page/'+pageNumber);
        const response = await api.get('/movimentacao/' + recordsPerPage + '/page/' + pageNumber);
        return response.data;
    };

    let sendData = async (movimentacao) => {
        try {
            const response = await api.post('/movimentacao/', movimentacao);
            //alert(produto.preco);
            return response;
        } catch (err) {
           console.log("ERRO: enviando movimentacao: " + err)
           return err;
        }
    }

    if (props.geraRelorio) {
        return (
            <Relatorio generateTableDataFunction={loadData}
                dataTemplate={MovimentoTemplate}
            />
        )
    } else {
        return sendData({
            idProduto: props.idProduto,
            quantidade: props.quantidade,
            valor: props.valor,
            tipo: props.tipo,
            usuario: props.usuario,
        })
    }
}
export default Movimentacao;

let m = <Movimentacao idProduto='' quantidade={1} valor={50} tipo='entrada' usuario={'idDoUsuario'}/>

Movimentacao.propTypes = {
    geraRelorio: PropTypes.bool,
    idProduto: PropTypes.string,
    quantidade: PropTypes.number,
    valor: PropTypes.number,
    tipo: PropTypes.string,
    usuario: PropTypes.number,
};