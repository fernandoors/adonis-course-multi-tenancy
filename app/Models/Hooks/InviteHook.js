'use strict'
const User = use('App/Models/User')

// const Job = use('App/Jobs/InvitationEmail')
// const Kue = use('Kue')
const Mail = use('Mail')

const InviteHook = exports = module.exports = {}

InviteHook.sendInvitationEmail = async (invite) => {
  const { email } = invite
  const invited = await User.findBy('email', email)
  if (invited) {
    await invited.teams().attach(invite.team_id)
  } else {
    const user = await invite.user().fetch()
    const team = await invite.team().fetch()
    Mail.send(
      ['emails.invitation'],
      { team: team.name, user: user.name },
      message => {
        message.to(email).from('contact@fdoors.com.br', 'Contact | Fdoors')
          .subject(`Invite to participate to team ${team.name}`)
      }
    )
    // Kue.dispatch(Job.key, { user, team, email }, { attempts: 3 })
  }
}
