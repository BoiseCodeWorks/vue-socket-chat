import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import socketStore from './socket-store'

let auth = axios.create({
    baseURL: '//localhost:3000/',
    timeout: 2000,
    withCredentials: true
})
let api = axios.create({
    baseURL: '//localhost:3000/api/',
    timeout: 2000,
    withCredentials: true
})


Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        user: {}
    },
    modules:{
        socketStore
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        login({ commit, dispatch }, payload) {
            auth.post('login', payload).then(res => {
                var user = res.data.data
                if(user){
                    commit('setUser', user)
                    dispatch('initSocket', user)
                }
            })
        },
        register({ commit, dispatch }, payload) {
            auth.post('register', payload).then(res => {
                var user = res.data.data
                if(user){
                    commit('setUser', user)
                    dispatch('initSocket', user)
                }
            })
        },
        authenticate({ commit, dispatch }) {
            auth('authenticate').then(res => {
                var user = res.data.data
                if(user){
                    commit('setUser', user)
                    dispatch('initSocket', user)
                }
            })
        }
    }
})


export default store



