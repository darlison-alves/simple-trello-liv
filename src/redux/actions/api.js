import axios from 'axios';
import {URL_API} from '../defaults/api'

export const apiBase = () => axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json'
    }
})