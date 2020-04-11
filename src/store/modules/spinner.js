const state = {
  fullpage: false,
  loading: false,
  cancel: false,
}

const getters = {
  loadingStatus(state) {
    return {
      isFullPage: state.fullpage,
      isLoading: state.loading,
      canCancel: state.cancel
    }
  }
}

const actions = {
  startLoading ({ commit }) {
    commit('SET_FULL_PAGE', true)
    commit('SET_LOADING', true)
    commit('SET_CAN_CANCEL', true)
  },
  finishLoading ({ commit }) {
    commit('SET_FULL_PAGE', false)
    commit('SET_LOADING', false)
    commit('SET_CAN_CANCEL', false)
  },
}

const mutations = {
  SET_FULL_PAGE(state, isFullPage) {
    state.fullpage = isFullPage
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_CAN_CANCEL(state, canCancel) {
    state.cancel = canCancel
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}