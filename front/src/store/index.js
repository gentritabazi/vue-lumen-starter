import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
}

const getters = {
    isLogged: state => !!state.token
}

const mutations = {
    LOGIN_USER(state, response) {
        var token = response.data.token
        var user = JSON.stringify(response.data.user)

        localStorage.setItem('token', token)
        localStorage.setItem('user', user)

        state.token = token
        state.user = user
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    
    LOGOUT_USER(state) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        state.token = null
        state.user = null
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})