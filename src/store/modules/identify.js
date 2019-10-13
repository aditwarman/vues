import * as types from '@/store/mutation-types'
import api from '@/services/api/identify'
import { buildSuccess, handleError } from '@/utils/utils.js'
import router from '@/router'

const getters = {
  attributes: state => state.attributes,
  features: state => state.features,
  stepCounter: state => state.stepCounter,
  result: state => state.result
}

const actions = {
  getAttributes({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAttributes(payload)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.data)
            commit(types.ATTRIBUTES, response.data.data)
            commit(types.ATTRIBUTES, response.data.data)
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
  saveCases({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveIdentify(payload)
        .then(response => {
          buildSuccess(
            {
              msg: 'common.SAVED_SUCCESSFULLY'
            },
            commit,
            resolve,
            router.push({
              name: 'result'
            })
          )
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  addTempFeature({ commit }, payload) {
    commit(types.TEMP_FEATURE, payload)
  },
  setStep({ commit }, payload) {
    commit(types.STEPCOUNTER, payload)
  }
}

const mutations = {
  [types.ATTRIBUTES](state, value) {
    state.attributes = value
  },
  [types.FEATURES](state, value) {
    state.features = value
  },
  [types.TEMP_FEATURE](state, value) {
    state.features.push(value)
  },
  [types.STEPCOUNTER](state, value) {
    state.stepCounter = value
  },
  [types.RESULT_IDENTIFY](state, value) {
    state.result = value
  }
}

const state = {
  attributes: [],
  features: [],
  stepCounter: 0,
  result: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
