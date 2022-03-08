import {
  store
} from "quasar/wrappers";
import {
  createStore
} from "vuex";
import auth from "./auth";
import companies from "./companies";

import products from "./product";

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
      products
    },
    plugins: [VuexORM.install(database, {
      readonly: false
    })],
    strict: process.env.DEBUGGING,
  });
  return Store;
});
