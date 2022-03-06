import * as types from "./mutation-types"

export default {
    [types.SET_ACCESS_TOKEN](state, payload) {
        state.access_token = payload
    },
    [types.SET_REFRESH_TOKEN](state, payload) {
        state.refresh_token = payload
    },
    [types.SET_DATA_USER](state, payload) {
        state.data_user = payload
    },
    [types.SET_EXP_TOKEN](state, payload) {
        state._exp_token = payload
    }
}
