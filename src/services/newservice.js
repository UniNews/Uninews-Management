import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    getAllNews: () => {
        return axios.get(`${API_URL}/articles/news`)
    },
    getNewsRecommendation: (id) => {
        return axios.get(`${API_URL}/news/${id}`)
    },
    getUniversityNews: () => {
        return axios.get(`${API_URL}/news/universities`)
    },
    getPromotionsNews: () => {
        return axios.get(`${API_URL}/news/promotions`)
    },
    getClubNews: () => {
        return axios.get(`${API_URL}/news/club`)
    },
    getNewsById: (id) => {
        return axios.get(`${API_URL}/news/${id}`)
    },
    postNews: async (data) => {
        const result = await axios.post(`${API_URL}/articles`,data)
        return result
    },
    uploadNewsImage: (formData) => {
        return axios.post(`${API_URL}/images`, formData);
    },
}