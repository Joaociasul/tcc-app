import * as types from "./mutation-types"

export default {
  [types.SET_PRODUCT](state, payload) {
    state.product = payload
  },
}
