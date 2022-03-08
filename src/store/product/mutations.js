import * as types from "./mutation-types"

export default {
  [types.SET_COMPANY](state, payload) {
    state.company = payload
  },
}
