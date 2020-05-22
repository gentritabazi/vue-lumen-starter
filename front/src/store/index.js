import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: localStorage.getItem('token'),
}

const getters = {
    isLogged: state => !!state.token
}

const mutations = {
    LOGIN_USER(state, response) {
        var token = response.data.token

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        state.token = token
        Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    
    LOGOUT_USER(state) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        state.token = null
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})