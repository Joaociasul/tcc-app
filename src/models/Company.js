import {
  Model
} from '@vuex-orm/core'
export default class Company extends Model {
  static entity = 'companies'
  static fields() {
    return {
      data: this.attr(null),
    }
  }
}
