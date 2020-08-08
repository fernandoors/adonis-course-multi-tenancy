'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTeam extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  roles() {
    return this.belongsToMany('Adonis/Acl/Role')
  }
  permission() {
    return this.belongsToMany('Adonis/Acl/Permission')
  }
  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }
}

module.exports = UserTeam
