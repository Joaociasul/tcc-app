import {
  getError,
  getHeaders
} from "src/services/utils"
import {
  api
} from 'src/boot/axios';

export const ActionGetProducts = ({}, search_term = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const companies = await api.get('product/paginate' + search_term, getHeaders())
      resolve(companies.data)
    } catch (error) {
      const data = getError(error)
      reject(data)
    }
  })
}

export const ActionCreateProduct = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const companies = await api.post('product', payload, getHeaders())
      resolve(companies.data)
    } catch (error) {
      const data = getError(error)
      reject(data)
    }
  })
}

export const ActionGetProduct = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    await api.get('product/getById/' + payload._id, getHeaders())
      .then(async resp => {
        resolve(resp.data)
      })
      .catch(err => reject(getError(err)))
  })
}

export const ActionUpdateProduct = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    const _id = payload._id
    delete payload._id
    await api.put('product/' + _id, payload, getHeaders())
      .then(resp => resolve(resp))
      .catch(e => reject(getError(e)))
  })
}

export const ActionDeleteProduct = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    await api.delete('product/' + payload._id, getHeaders())
      .then(() => resolve(true))
      .catch(e => reject(e))
  })
}
