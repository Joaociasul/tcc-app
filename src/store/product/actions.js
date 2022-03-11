import {
  getError,
  getHeaders
} from "src/services/utils"
import {
  api
} from 'src/boot/axios';

import * as types from './mutation-types'

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

export const ActionGetProduct = ({
  dispatch
}, payload) => {
  return new Promise(async (resolve, reject) => {
    await api.get('product/getById/' + payload._id, getHeaders())
      .then(async resp => {
        dispatch('ActionSetProduct', resp.data)
        resolve(resp.data)
      })
      .catch(err => reject(getError(err)))
  })
}

export const ActionSetProduct = ({
  commit
}, payload) => {
  commit(types.SET_PRODUCT, payload)
}
