import userService from '@/services/userservice'
import axios from 'axios'

const state = {
  user: null,
  error: '',
  loading: false,
  isAuthenticated: false
}

const getters = {
  isAuthenticated(state) {
    return state.user !== null
  },
  getUser(state) {
    return state.user
  },
  getError(state) {
    return state.error
  },
  isLoading(state) {
    return state.loading
  }
}

const actions = {
  async login ({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const result = await userService.login(credentials.username,credentials.password)
        axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.access_token}`
        commit('SET_AUTH', result.data)
        commit('SET_LOADING', false)
        commit('SET_ERROR', null)
      } catch (err) {
        commit('SET_ERROR', err)
        commit('SET_LOADING', false)
        alert('Email or password is wrong!')
      }
    },
  async logout ({ commit }) {
    commit('SET_LOADING', true)
    try {
      localStorage.clear()
      commit('PURGE_AUTH')
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    } catch (err) {
      commit('SET_ERROR', err)
      commit('SET_LOADING', false)
    }
  },
  async autoLogin ({ commit }) {
    commit('SET_LOADING', true)
    try{
      const storage = localStorage.getItem("vuex");
      const token = JSON.parse(storage).Auth.user.access_token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      commit('SET_AUTH', JSON.parse(storage).Auth.user)
      commit('SET_LOADING', false)
      commit('SET_ERROR', null)
    }catch(err) {
      commit('SET_ERROR', err)
      commit('SET_LOADING', false)
      alert(err)
    }
  }
}

const mutations = {
  SET_ERROR(state, error) {
    state.errors = error
  },
  SET_AUTH(state, user) {
    state.user = user
  },
  PURGE_AUTH(state) {
    state.user = null
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}