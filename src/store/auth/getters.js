import {
  Cookies,
  SessionStorage
} from "quasar"

const expired = (msExpires) => {
  if (!msExpires) return true
  return msExpires <= (new Date()).getTime()
}

export const getToken = (state) => {
  return state.access_token ||
    SessionStorage.getItem('access_token')
}

export const getRefreshToken = (state) => {
  return state.refresh_token ? atob(state.refresh_token) :
    atob(Cookies.get('refresh_token'))
}

export const getDataUser = (state) => {
  return state.data_user ||
    SessionStorage.getItem('data_user')
}

export const tokenExpired = (state) => {
  return state._exp_token ? expired(state._exp_token) : expired(SessionStorage.getItem('_exp_token'))
}
