import {
  getError,
  getHeaders
} from "src/services/utils"
import {
  api
} from 'src/boot/axios';

export const ActionGetUsers = ({}, search_term = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await api.get('user' + search_term, getHeaders())
      resolve(users.data)
    } catch (error) {
      const data = getError(error)
      reject(data)
    }
  })
}

export const ActionGetDataByCnpj = ({}, payload) => {
  return new Promise((resolve, reject) => {
    payload = payload.replace(/[^\d]+/g, '')
    api.get('getByCnpj/' + payload)
      .then(resp => {
        resolve(resp.data)
      })
      .catch(e => reject(e))
  })
}

export const ActionCreateCompany = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await api.post('company', payload, getHeaders())
      resolve(users.data)
    } catch (error) {
      const data = getError(error)
      reject(data)
    }
  })
}

export const ActionGetCompany = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    await api.get('company/getById/' + payload._id, getHeaders())
      .then(async resp => {
        resolve(resp.data)
      })
      .catch(err => reject(getError(err)))
  })
}

export const ActionUpdateCompany = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    const _id = payload._id
    delete payload._id
    await api.put('company/' + _id, payload, getHeaders())
      .then(resp => resolve(resp))
      .catch(e => reject(getError(e)))
  })
}

export const ActionDeleteCompany = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    await api.delete('company/' + payload._id, getHeaders())
      .then(() => resolve(true))
      .catch(e => reject(e))
  })
}
