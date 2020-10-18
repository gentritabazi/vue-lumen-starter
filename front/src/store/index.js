import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
	displayLoader: false,
	loggedUser: localStorage.getItem('loggedUser') || null
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations
})