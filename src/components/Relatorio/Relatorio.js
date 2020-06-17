import React, { Component } from 'react';
import api from '../../services/api';
import './Relatorio.css';




export default class Relatorio extends Component {

    state = {
        dataItems: [],
    }

    componentDidMount() {
        //console.log(this.props.generateTableDataFunction);
        let generatedDataPromise = this.props.generateTableDataFunction();
        console.log("Gen: " + generatedDataPromise);
        generatedDataPromise.then(result => this.setState({dataItems: result}));
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    loadDadosRelatorios = async () => {
        const response = await api.get(this.props.apiPath);
        this.setState({ dataItems: response.data.docs });
    };

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


    mapTableData = (dataItem) => {
        let templateKeys = Object.keys(this.props.dataTemplate);
        return (
            <tr key={'dataItem_' + dataItem.id} >
                {
                    templateKeys.map((elem) => {
                        return (
                            <td>{eval("dataItem." + elem)}</td>
                        );
                    })
                }
            </tr>
        )
    }


    render() {
        return (
            <div class='container'>
                <div class='relatorio'>
                    <table id='table_relatorio'>
                        {Object.keys(this.props.dataTemplate).map(this.generateTableHeader)}
                        {this.state.dataItems.map(this.mapTableData)}
                    </table>
                </div>
            </div>
        );
    }
}