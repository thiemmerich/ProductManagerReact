import Axios from 'axios';
import { getToken } from './auth';

const api = Axios.create({
    baseURL: 'http://product-node-mysql-api.herokuapp.com/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;