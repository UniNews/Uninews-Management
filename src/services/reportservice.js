import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    getAllReport: async () => {
        const data = await axios.get(`${API_URL}/reports`)
        return data
    },
    getReportById: async (id) => {
        const data = await axios.get(`${API_URL}/reports/${id}`)
        return data
    },
    deleteReportById: async (id) => {
        const data = await axios.delete(`${API_URL}/reports/${id}`)
        return data
    }
}