import React, { Component } from 'react';
import './Relatorio.css';

/**
 * Componente Relatorio para a geração de relatorios customizados.
 * Deve receber como Propriedades:
 *  - um template dos dados a serem exibidos em formato Objeto JSON (dataTemplate);
 *      O template deve refletir o formato dos dados buscados no callback, 'achatando' objetos aninhados
 *      com o caracter '_'. 
 *      Ex: dados { a: 1, objAninhado:{ b: 2} } -> dadosTemplate:{a : '', objAninhado_b: ''}
 *  - função callback para a geração dos dados (generateTableDataFunction), recebendo como parametro 
 *      o numero da pagina a ser carregada no relatorio
 */
export default class Relatorio extends Component {

    // Relatorio.propTypes = {

    // };

    state = {
        dataItems: [],
        currentPage: 1,
        totalPages: 0,
        totalRecords: 0,
        error: ''
    }

    componentDidMount() {
        //console.log(this.props.generateTableDataFunction);
        let generatedDataPromise = this.props.generateTableDataFunction(1);
        console.log("Gen: " + generatedDataPromise);
        generatedDataPromise.then(result => {
            this.setState(
                {
                    dataItems: result.docs,
                    totalPages: result.pages,
                    totalRecords: result.total
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
                {value}
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

    mapTableData = (dataItem) => {
        let flattenedData = this.flatten(dataItem);
        console.log("Flattened:: " + flattenedData);
        let templateKeys = Object.keys(this.props.dataTemplate);
        return (
            <tr key={'dataItem_' + dataItem.id} >
                {
                    templateKeys.map((elem) => {
                        return (
                            <td>{flattenedData[elem]}</td>
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
    return (
        <>
        <b>Total: {this.state.totalRecords}. Páginas: {this.state.totalPages}. </b>
        <table id='table_relatorio'>
            {Object.keys(this.props.dataTemplate).map(this.generateTableHeader)}
            {this.state.dataItems.map(this.mapTableData)}
        </table>
        </>
        )
    }


render() {
    return (
        <div className='container'>
            <div className='relatorio'>
                {this.conteudoRelatorio()}
            </div>
        </div>
    );
}
}