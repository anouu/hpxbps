import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'
import App from './app'
import VueRouter from 'vue-router'
import store from './assets/scripts/store'
import './assets/styles/main.scss'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      name:'home', 
      component: App,
    },
    { path: '*', redirect: '/' },
  ]
})

new Vue({
  router,
  store,
}).$mount('#app')