import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isLogged: !!localStorage.getItem('token')
}

const mutations = {
    LOGIN_USER(state) {
        state.isLogged = true
    },
    
    LOGOUT_USER(state) {
        state.isLogged = false
    }
}

export default new Vuex.Store({
    state,
    mutations
})