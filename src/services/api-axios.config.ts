import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.URL_API + '/api/',
});

axiosInstance.interceptors.request.use(
    (config) => {
        // TODO TOKEN
        const token = '{TOKEN}'
        const auth = token ? `Bearer ${token}` : ''
        config.headers.Authorization = auth;
        const contentType = config.headers['Content-Type'];
        if (!contentType) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => Promise.reject(error),
);

const ApiAxios = axiosInstance
export default ApiAxios