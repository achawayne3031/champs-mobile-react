import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com'
const TEST_API_URL = 'http://localhost:4000/api'

export function getRequest(path: string) {
  return axios.get(TEST_API_URL + path)
}
