import Axios from 'axios';
import { getToken, logout } from './auth';

const api = Axios.create({
    //baseURL: 'http://localhost:3001/api'
    baseURL: 'https://product-node-mysql-api.herokuapp.com/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.data.status === 401) {
        console.log("INTERCEPTED: " + error.response.data.status);
        alert('Sessão expirada! Favor faça login novamente!');
        logout();
        window.location.href = '/';
    }

    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

export default api;