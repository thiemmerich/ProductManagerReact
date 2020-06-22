import React, { Component } from 'react';
import './Relatorio.css';

import PropTypes from 'prop-types';


/**
 * Componente Relatorio para a geração de relatorios customizados.
 * Deve receber como Propriedades:
 *  - dataTemplate - um template dos dados a serem exibidos em formato Objeto JSON (propriedade:'HeaderValue') ;
 *      O template deve refletir o formato dos dados buscados no callback, 'achatando' objetos aninhados
 *      com o caracter '_'. 
 *      Ex: dados { a: 1, objAninhado:{ b: 2} } -> dadosTemplate:{a : 'Coluna A', objAninhado_b: 'Coluna B'}
 *  - função callback para a geração dos dados (generateTableDataFunction), recebendo como parametro 
 *      o numero da pagina a ser carregada no relatorio
 */

export default class Relatorio extends Component {

    

    state = {
        dataItems: [],
        currentPage: 1,
        totalPages: 0,
        totalRecords: 0,
        error: ''
    }

    componentDidMount() {
        //console.log(this.props.generateTableDataFunction);
        this.loadData(1);
    }

    loadData = (page) => {
        let generatedDataPromise = this.props.generateTableDataFunction(page);
        //console.log("Gen: " + generatedDataPromise);
        generatedDataPromise.then(result => {
            this.setState(
                {
                    dataItems: result.docs,
                    totalPages: result.pages,
                    totalRecords: result.total,
                    currentPage: page,
                }
            )
        }).catch((err) => {
            this.setState({
                error: 'Erro na busca dos dados do relatorio...' + err
            })
        });
    }


    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    generateTableHeader = (value) => {
        var keyVal = 'th_' + value;
        return (

            <th key={keyVal}>
                {this.props.dataTemplate[value]}
            </th>

        )
    }


    getTdFromTemplateKey = (templateKey, produto) => {
        return (
            <td>{produto.templateKey}</td>
        )
    }

    flatten = (jsonObject, hierarchy = []) => {
        return Object.keys(jsonObject).reduce(
            (resultingObject, property) => {
                let currentCheckingValue = jsonObject[property];
                //Adiciona o nome da propriedade no array de hierarquia
                let newHierarchy = hierarchy.concat(property);
                //Propriedade é um valor e nao um objeto JSON
                if (typeof currentCheckingValue !== 'object') {
                    //gera uma string com os valores do array separados pelo caracter _
                    //Ex:property='bbq', hierarchy=['as','aq'] -> 'as_aq_bbq' 

                    let currentHierarchicalName = newHierarchy.join("_");
                    resultingObject[currentHierarchicalName] = jsonObject[property];
                    return resultingObject;
                }
                //Objeto Json, achata a propriedade e atribui ao objeto resultado
                return Object.assign(resultingObject, this.flatten(currentCheckingValue, newHierarchy, resultingObject));
            }
            , {})//valor inicial do reduce é um novo objeto vazio
    }

    generateTableRows = (dataItem, index) => {
        let flattenedData = this.flatten(dataItem);
        //console.log("Flattened:: " + flattenedData);
        let templateKeys = Object.keys(this.props.dataTemplate);
        let dataItemKey = 'pg' + this.state.currentPage + '_row' + index;
        return (
            <tr key={dataItemKey} >
                {
                    templateKeys.map((elem, elIndex) => {
                        return (
                            <td key={dataItemKey + '_td' + elIndex}>{flattenedData[elem]}</td>
                        );
                    })
                }
            </tr>
        )

    }

    conteudoRelatorio = () => {
        if (this.state.error) {
            return <div className='msg_erro'><b> ERRO: {this.state.error}</b></div>
        }
        let int_currentPage = parseInt(this.state.currentPage);
        let int_totalPages = parseInt(this.state.totalPages);
        //console.log('current: ' + int_currentPage + " | total: " + int_totalPages);
        return (
            <>
                <table id='table_relatorio'>
                    <thead>
                        <tr>
                            {Object.keys(this.props.dataTemplate).map(this.generateTableHeader)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataItems.map(this.generateTableRows)}
                    </tbody>
                </table>
                <div className='pageButtons'>
                    <button className='button_pageNumber' id='button_previous'
                        onClick={() => this.loadData(int_currentPage - 1)}
                        disabled={int_currentPage <= 1}>
                        &lt;&lt;</button>
                    <div className='numberButtons'>
                        {
                            //Array iniciando em 1 até o numero total de paginas
                            [...Array(this.state.totalPages).keys()].map(i => i + 1).reduce(
                                (accumulator, curValue) => {
                                    return (
                                        accumulator.concat(
                                            <button className='button_pageNumber'
                                                onClick={(e) => this.loadData(curValue)
                                                }
                                                key={'btn_page' + curValue}>
                                                {curValue}
                                            </button>
                                        )
                                    )
                                }, [])
                        }
                    </div>
                    <button className='button_pageNumber' id='button_next'
                        onClick={() => this.loadData(int_currentPage + 1)}
                        disabled={int_currentPage >= int_totalPages}>
                        &gt;&gt;</button>
                </div>
            </>
        )
    }


    render() {
        return (

            <div className='relatorio'>
                {this.conteudoRelatorio()}
            </div>

        );
    }
}
Relatorio.propTypes = {
    dataTemplate : PropTypes.object.isRequired,
    generateTableDataFunction: PropTypes.func.isRequired,
};