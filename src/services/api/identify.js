import axios from 'axios'

export default {
  getAttributes() {
    return axios.get('/serv/getAttributes')
  },
  getFeatures() {
    return axios.get('/serv/getFeatures')
  },
  saveIdentify(payload) {
    return axios.post('/serv/postNewCases', payload)
  }
}
