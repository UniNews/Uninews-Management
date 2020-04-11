import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import authModule from './modules/auth'
import spinnerModule from './modules/spinner'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const modules = {
  Auth: authModule,
  Spinner: spinnerModule
}

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
})
