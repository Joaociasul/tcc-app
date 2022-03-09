import * as types from "./mutation-types"
export const ActionSetPage = ({
  commit
}, payload) => {
  commit(types.SET_PAGE, payload)
}
