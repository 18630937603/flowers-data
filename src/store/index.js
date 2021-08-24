import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'vintage'
  },
  mutations: {
    changeTheme (state) {
      if (state.theme === 'vintage') {
        state.theme = 'chalk'
      } else {
        state.theme = 'vintage'
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
