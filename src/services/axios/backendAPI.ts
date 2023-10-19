import axios from 'axios'

export const axiosBackendAPI = axios.create({
    // baseURL: process.env.BACKEND_API,
    baseURL: 'http://localhost:5000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});