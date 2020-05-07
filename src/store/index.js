import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'

Vue.use(Vuex)

const modules = {
  Auth: authModule
}

export default new Vuex.Store({
  modules,
})
