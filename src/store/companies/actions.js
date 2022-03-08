import {
  getError,
  getHeaders
} from "src/services/utils"
import {
  api
} from 'src/boot/axios';

import * as types from './mutation-types'
import Company from "src/models/Company";

export const ActionGetCompanies = ({}, search_term = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const companies = await api.get('company/paginate' + search_term, getHeaders())
      resolve(companies.data)
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
        console.log(resp)
        resolve(resp.data)
      })
      .catch(e => reject(e))
  })
}

export const ActionCreateCompany = ({}, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const companies = await api.post('company', payload, getHeaders())
      resolve(companies.data)
    } catch (error) {
      const data = getError(error)
      reject(data)
    }
  })
}

export const ActionSetCompany = ({

}, payload) => {
  Company.create({
    data: {
      data: payload
    }
  })
}

export const ActionGetCompany = ({
  dispatch
}, payload) => {
  return new Promise(async (resolve, reject) => {
    console.log(payload)
    await api.get('company/getById/' + payload._id, getHeaders())
      .then(async resp => {
        // await dispatch('ActionSetCompany', resp.data)
        resolve(resp.data)
      })
      .catch(err => reject(getError(err)))
  })
}
