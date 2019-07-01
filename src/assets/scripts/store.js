import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutation-types'
import json from '../texts.json'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {
    cart: [],
    books: [],
    offersData: {},
    texts: json
  },
  mutations: {
    [types.UPDATE_CART](state, payload) {
      state.cart.push(payload)
    },
    [types.CLEAR_CART](state) {
      state.cart = []
    },
    [types.GET_BOOKS](state, payload) {
      state.books = payload || []
    },
    [types.GET_OFFERS](state, payload) {
      state.offersData = payload || {}
    },
  },
  getters: {
    cart: state => state.cart,
    texts: state => state.texts,
    books: state => state.books,
    cartBooks: state => _.filter(state.books, (item) => _.includes(state.cart, item.isbn)),
    offersData: state => state.offersData
  },
  actions: {
    async getBooks({ commit }) {
      let data
      try {
        data = (await axios.get('http://henri-potier.xebia.fr/books')).data
      } catch (error) {
        data = []
      }
      commit(types.GET_BOOKS, data)
    },
    async getOffers({ commit, state }) {
      let data
      try {
        data = (await axios.get(`http://henri-potier.xebia.fr/books/${_.toString(state.cart)}/commercialOffers`)).data
      } catch (error) {
        data = {}
      }
      commit(types.GET_OFFERS, data)
    }
  },
})

export default store