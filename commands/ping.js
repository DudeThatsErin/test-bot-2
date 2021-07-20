module.exports = {
    name: 'ping',
    description: 'This displays a ping/pong command in a channel. Checks to see if the bot is alive.',
    aliases: ['beep', 'pong'],
    usage: 's.ping',
    inHelp: 'yes',
  example: 's.ping or s.beep',
  botPerms: [''],
    userPerms: [''],
    execute (message, args) {
      message.reply('pong!', { allowedMentions: { repliedUser: false }})
    }
}