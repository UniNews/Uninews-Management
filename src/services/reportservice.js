import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    getAllReport: () => {
        return axios.get(`${API_URL}/report`)
    }
}