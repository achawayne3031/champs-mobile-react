import axios from 'axios'
import { UserData } from './model'
import { toast } from 'react-toastify'

const TEST_API_URL = 'http://127.0.0.1:4000/api'

export function getRequest(path: string) {
  let res = axios.get(TEST_API_URL + path)

  if (res) {
    console.log(res, 'our res')
  }
  return res
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

export function displayNotify(msg: string, type: boolean) {
  switch (type) {
    case true:
      toast.success(`${msg}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      break

    case false:
      toast.error(`${msg}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      break

    default:
      break
  }
}
