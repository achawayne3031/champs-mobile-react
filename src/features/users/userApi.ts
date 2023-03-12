import axios from 'axios'
import { UserData } from './model'

const TEST_API_URL = 'http://127.0.0.1:4000/api'

export function getRequest(path: string) {
  return axios.get(TEST_API_URL + path)
}

export function postRequest(path: string, data: UserData) {
  let reqData = {
    name: data.name,
    email: data.email,
  }
  return axios.post(TEST_API_URL + path, JSON.stringify(reqData))
}

export function deleteRequest(path: string) {
  return axios.delete(TEST_API_URL + path)
}

export function updateRequest(path: string, data: UserData) {
  let reqData = {
    name: data.name,
    email: data.email,
  }
  return axios.put(TEST_API_URL + path, JSON.stringify(reqData))
}
