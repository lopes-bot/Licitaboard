import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCityCode: '',
    selectedCityName: '',
    selectedYear: 2010
  },
  getters: {
    selectedCityCode: state => {
      return state.selectedCityCode
    },
    selectedCityName: state => {
      return state.selectedCityName
    },
    selectedYear: state => {
      return state.selectedYear
    }
  },
  mutations: {
    selectCity (state, payload) {
      state.selectedCityCode = payload.code
      state.selectedCityName = payload.name
    },
    selectYear (state, payload) {
      state.selectedYear = parseInt(payload.year)
    }
  },
  actions: {

  },
  modules: {

  }
})
