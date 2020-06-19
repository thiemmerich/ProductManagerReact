import React, { Component } from 'react';
import api from '../../services/api';
import './Relatorio.css';
import PropTypes from 'prop-types'


/**
 * Componente Relatorio para a geração de relatorios customizados.
 * Deve receber como Propriedades:
 *  - um template dos dados a serem exibidos em formato Objeto JSON (dataTemplate);
 *      O template deve refletir o formato dos dados buscados no callback, 'achatando' objetos aninhados
 *      com o caracter '_'. 
 *      Ex: dados { a: 1, objAninhado:{ b: 2} } -> dadosTemplate:{a : '', objAninhado_b: ''}
 *  - função callback para a geração dos dados (generateTableDataFunction)
 */
export default class Relatorio extends Component {

    // Relatorio.propTypes = {

    // };

    state = {
        dataItems: [],
    }

    componentDidMount() {
        //console.log(this.props.generateTableDataFunction);
        let generatedDataPromise = this.props.generateTableDataFunction();
        console.log("Gen: " + generatedDataPromise);
        generatedDataPromise.then(result => this.setState({ dataItems: result }));
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    // loadDadosRelatorios = async () => {
    //     const response = await api.get(this.props.apiPath);
    //     this.setState({ dataItems: response.data.docs });
    // };

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


    

    flatten = (jsonObject, hierarchy=[] ) => {
        return Object.keys(jsonObject).reduce(
            (resultingObject, property) => {
                let currentCheckingValue = jsonObject[property];
                 //Adiciona o nome da propriedade no array de hierarquia
                let newHierarchy = hierarchy.concat(property);
                //Propriedade é um valor e nao um objeto JSON
                if(typeof currentCheckingValue !== 'object'){
                    //gera uma string com os valores do array separados pelo caracter _
                    //Ex:property='bbq', hierarchy=['as','aq'] -> 'as_aq_bbq' 
                    let currentHierarchicalName= newHierarchy.join("_");    
                    resultingObject[currentHierarchicalName] = jsonObject[property];
                    return resultingObject;
                }
                //Objeto Json, achata a propriedade e atribui ao objeto resultado
                return Object.assign(resultingObject, this.flatten(currentCheckingValue, newHierarchy, resultingObject));
            }
        ,{} )//valor inicial do reduce é um novo objeto vazio
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


    render() {
        return (
            <div className='container'>
                <div className='relatorio'>
                    <table id='table_relatorio'>
                        {Object.keys(this.props.dataTemplate).map(this.generateTableHeader)}
                        {this.state.dataItems.map(this.mapTableData)}
                    </table>
                </div>
            </div>
        );
    }
}