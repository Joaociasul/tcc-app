import * as types from "./mutation-types"

export default {
  [types.SET_PAGE](state, payload) {
    state.page = payload
  },
}
