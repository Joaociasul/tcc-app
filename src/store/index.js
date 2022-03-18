import {
  store
} from "quasar/wrappers";
import {
  createStore
} from "vuex";
import auth from "./auth";
import companies from "./companies";

import products from "./product";
import paginator from "./paginator";
import user from "./user"

/**ORM */
import VuexORM from '@vuex-orm/core'
import Company from '../models/Company.js'

const database = new VuexORM.Database()
database.register(Company)

export default store(( /* { ssrContext } */ ) => {
  const Store = createStore({
    modules: {
      auth: auth,
      companies,
      products,
      paginator,
      user
    },
    plugins: [VuexORM.install(database, {
      readonly: false
    })],
    strict: false,
  });
  return Store;
});
