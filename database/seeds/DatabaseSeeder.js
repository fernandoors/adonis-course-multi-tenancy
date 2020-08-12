'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')
const Env = use('Env')

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      name: 'SysAdmin',
      email: Env.get('SYS_ADMIN_EMAIL'),
      password: Env.get('SYS_ADMIN_PASSWORD')
    })
    const createInvite = await Permission.create({
      slug: 'invites_create',
      name: 'Invite members'
    })
    const createProject = await Permission.create({
      slug: 'projects_create',
      name: 'Create Projects'
    })

    const admin = await Role.create({
      slug: 'administrator',
      name: 'Administrador'
    })
    const moderator = await Role.create({
      slug: 'moderator',
      name: 'Moderator'
    })
    await Role.create({
      slug: 'visitor',
      name: 'Visitor'
    })

    await admin.permissions().attach([createInvite.id, createProject.id])
    await moderator.permissions().attach([createProject.id])

    const team = await user.teams().create({
      name: 'FDOORS Lab',
      user_id: user.id
    })

    const teamJoin = await user.teamJoins().where('team_id', team.id).first()
    await teamJoin.roles().attach([admin.id])
  }
}

module.exports = DatabaseSeeder
