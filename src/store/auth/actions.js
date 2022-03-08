import {
  Cookies,
  LocalStorage,
  SessionStorage
} from "quasar"
import {
  api
} from "src/boot/axios"
import {
  getError,
  getResponse
} from "src/services/utils"
import * as types from "./mutation-types"
export const ActionSetToken = ({
  commit
}, payload) => {
  SessionStorage.set('access_token', payload)
  commit(types.SET_ACCESS_TOKEN, payload)
}
export const ActionLogin = async ({
  dispatch
}, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post('user/login', payload)
      const data = getResponse(response)
      await dispatch('ActionSetToken', data._token)
      await dispatch('AcionSetExpToken', data._exp_token)
      await dispatch('ActionSetRefreshToken', data.refresh_token)
      await dispatch('ActionSetDataUser', data)
      return resolve(data)
    } catch (error) {
      console.log(error)
      const data = getError(error)
      reject(data)
    }
  })
}

export const ActionSetRefreshToken = ({
  commit
}, payload) => {
  payload = btoa(payload)
  Cookies.set('refresh_token', payload, {
    expires: 6
  })
  commit(types.SET_REFRESH_TOKEN, payload)
}

export const ActionSetDataUser = ({
  commit
}, payload) => {
  delete payload._token
  delete payload.refresh_token
  delete payload._exp_token
  SessionStorage.set('data_user', payload)
  commit(types.SET_DATA_USER, payload)
}

export const AcionSetExpToken = ({
  commit
}, payload) => {
  SessionStorage.set('_exp_token', payload)
  commit(types.SET_EXP_TOKEN, payload)
}

export const ActionRefreshToken = ({
  dispatch,
  getters
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        refresh_token: await getters.getRefreshToken
      }
      const response = await api.post('user/refresh-token', payload)
      const data = response.data
      if (!data) {
        return reject({
          error: "data is null"
        })
      }
      await dispatch('ActionSetToken', data._token)
      await dispatch('AcionSetExpToken', data._exp_token)
      await dispatch('ActionSetRefreshToken', data.refresh_token)
      await dispatch('ActionSetDataUser', data)
      return resolve(data)
    } catch (error) {
      return reject(getError(error))
    }
  })
}
export const ActionLogout = () => {
  SessionStorage.clear()
  Cookies.remove('refresh_token')
  LocalStorage.clear()
  window.location.reload()
}
