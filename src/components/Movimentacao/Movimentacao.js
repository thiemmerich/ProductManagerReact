import React from 'react';
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

    return (
        <Relatorio generateTableDataFunction={loadData}
            dataTemplate={MovimentoTemplate}
        />
    )
}

export function getGravarMovimentacao(props) {
    let sendData = async (movimentacao) => {
        await api.post('/movimentacao/', movimentacao);
    }
    return () => sendData({
        idProduto: props.idProduto,
        quantidade: props.quantidade,
        valor: props.valor,
        tipo: props.tipo,
        usuario: props.usuario,
        tamanho: props.tamanho,
        devolucao: props.devolucao
    })
}

export default Movimentacao;

Movimentacao.propTypes = {
    idProduto: PropTypes.number,
    quantidade: PropTypes.number,
    valor: PropTypes.number,
    tipo: PropTypes.oneOf(['entrada', 'saida']),
    usuario: PropTypes.number,
    devolucao: PropTypes.bool
};