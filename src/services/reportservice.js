import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    getAllReport: async () => {
        const data = await axios.get(`${API_URL}/report`)
        return data
    },
    getReportById: async (id) => {
        const data = await axios.get(`${API_URL}/report/${id}`)
        return data
    },
    deleteReportById: async (id) => {
        const data = await axios.delete(`${API_URL}/report/${id}`)
        return data
    }
}