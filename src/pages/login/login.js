import React, { Component } from 'react';
import api from '../../services/api';
import './login.css';

import logo from '../../images/logo.jpeg';
import { login, getToken } from '../../services/auth';

export default class Login extends Component {

    state = {
        name: "",
        password: "",
        token: "",
        status: "",
        result: {}
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { name, password } = this.state;

        if (!name || !password) {
            this.setState({ error: "Preencha os campos para continuar!" });
        } else {
            try {
                const response = await api.post("/auth", { name, password });

                this.setState({
                    token: response.data.token,
                    status: response.data.status,
                    result: response.data.result
                });

                login(this.state.token, this.state.status);

            } catch (err) {
                if (err.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(err.response.data);
                    //this.setState({ message: "Ocorreu um erro ao fazer login: " + err.response.data.message });
                    //this.setState({ success: err.response.data.success });
                } else if (err.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(err.request);
                    //this.setState({ message: "Erro ao conectar ao servidor: " + err.request });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('error', err.message);
                    //this.setState({ message: "Erro: " + err.message });
                }
            }
        }
    };

    render() {
        const { products } = this.state;

        return (
            <div className='login-main-screen'>
                <form onSubmit={this.handleSignIn}>
                    <div >
                        <img src={logo} alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label ><b>Usuario</b></label>
                        <input
                            type="text"
                            placeholder="Usuário"
                            onChange={e => this.setState({ name: e.target.value })}
                        />

                        <label ><b>Senha</b></label>
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={e => this.setState({ password: e.target.value })}
                        />

                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
