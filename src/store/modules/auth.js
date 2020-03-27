import userService from '@/services/userservice'

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
          console.log(result,'user')
          commit('SET_AUTH', result)
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
        commit('PURGE_AUTH')
        commit('SET_LOADING', false)
        commit('SET_ERROR', null)
      } catch (err) {
        commit('SET_ERROR', err)
        commit('SET_LOADING', false)
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