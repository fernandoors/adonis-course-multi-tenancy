'use strict'
const User = use('App/Models/User')

const Job = use('App/Jobs/InvitationEmail')
const Kue = use('Kue')

const InviteHook = exports = module.exports = {}

InviteHook.sendInvitationEmail = async (invite) => {
  const { email } = invite
  const invited = await User.findBy('email', email)
  if (invited) {
    console.log('tem conta', email)
    await invited.teams().attach(invite.team_id)
  } else {
    const user = await invite.user().fetch()
    const team = await invite.team().fetch()

    Kue.dispatch(Job.key, { user, team, email }, { attempts: 3 })
  }
}
