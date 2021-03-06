import React, { Component } from 'react';

import api from '../../services/api';
import './login.css';

import logo from '../../images/logo.jpeg';
import loading from '../../images/loading.gif';
import { login, logout } from '../../services/auth';

export default class Login extends Component {

    state = {
        name: "",
        password: "",
        status: "",
        error: "",
        showErrorClassName: 'hideError',
        showLoading: 'hideLoading',
        result: {}
    }

    hiddingAlert = () => {
        this.setState({ showErrorClassName: "hideError" });
    }

    performLogout = () => {
        logout();
        alert('Sessão expirada!');
        this.props.history.push("/");
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { name, password } = this.state;

        if (!name || !password) {
            this.setState({ showErrorClassName: "showError", error: "Preencha os campos para continuar!" });
            setTimeout(this.hiddingAlert, 3000);
        } else {
            try {
                this.setState({showLoading: "showLoading"});

                await api.post("/auth", { name, password })
                    .then((response) => {
                        this.setState({
                            token: response.data.token,
                            status: response.data.status,
                            result: response.data.result
                        });

                        console.log(this.state.result);

                        login(response.data.token,
                            response.data.status,
                            response.data.result.name,
                            response.data.result.id,
                            response.data.result.email
                        );

                        this.setState({showLoading: "hideLoading"});
                        this.props.history.push("/dashboard");
                    });

            } catch (err) {
                setTimeout(this.hiddingAlert, 3000);
                if (err.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(err.response.data);
                    this.setState({ showErrorClassName: "showError", error: "Ocorreu um erro ao fazer login: " + err.response.data.errorMsg });
                } else if (err.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(err.request);
                    this.setState({ showErrorClassName: "showError", error: "Erro ao conectar ao servidor: " + err.request });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('error', err.message);
                    this.setState({ showErrorClassName: "showError", error: "Erro: " + err.message });
                }
            }
        }
    };

    render() {
        return (
            <div className='login-screen'>
                <p className={this.state.showErrorClassName}>{this.state.error}</p>
                <div id='loadingBlock' className={this.state.showLoading}>
                    <img src={loading} />
                    <h1>Aguarde</h1>
                </div>
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
