import axios from 'axios'
import { domain } from '../constants'

axios.defaults.baseURL = `${domain}api`
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

export default axios