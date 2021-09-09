const { Client, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'ping',
  aliases: ['pong', 'beep', 'boop'],
  categories: 'Miscellaneous',
  description: 'Check to make sure the bot is online.',
  usage: '/ping',
  /** 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @param {String[]} args 
   */
  run: async (client, interaction) => {
    interaction.editReply({ content: `Ping : ${client.ws.ping}` })
  }
}