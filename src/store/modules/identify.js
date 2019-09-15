import * as types from '@/store/mutation-types'
import api from '@/services/api/identify'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  attributes: state => state.attributes,
  features: state => state.features
}

const actions = {
  getAttributes({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAttributes(payload)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            commit(types.ATTRIBUTES, response.data)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  getFeatures({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getFeatures(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.FEATURES, response.data)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
}

const mutations = {
  [types.ATTRIBUTES](state, attributes) {
    state.attributes = attributes
  },
  [types.FEATURES](state, value) {
    state.features = value
  }
}

const state = {
  attributes: [],
  features: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
