import { API_URL } from '@/config/environments'
import axios from 'axios'

export default {
    login: async (email, password) => {
        const json = {
            grant_type: 'password',
            email: email,
            password: password
        }
        const data = await axios.post(`${API_URL}/admin-token`, json, {
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(data)
        return data
    },
    register: (email, password) => {
        const json = {
            displayName: email,
            email: email,
            password: password
        }
        return axios.post(`${API_URL}/registerByEmail`, json, {
            headers: { 'Content-Type': 'application/json' }
        });
    },
    getProfile: () => {
        return axios.get(`${API_URL}/profile/me`)
    },
    getNormalUserById: (id) => {
        return axios.get(`${API_URL}/users/${id}/normal`).then(response => response.data)
            .catch(error => error)
    },
    getUserById: (id) => {
        return axios.get(`${API_URL}/users/${id}`).then(response => response.data)
            .catch(error => error)
    },
    followUserById: (id) => {
        return axios.post(`${API_URL}/users/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}