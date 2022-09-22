import axios from "axios";

const BASE_URL = 'https://j7e203.p.ssafy.io/'
// const BASE_URL = 'http://localhost:8080/'
const DEFAULT_ACCEPT_TYPE = 'application/json'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE