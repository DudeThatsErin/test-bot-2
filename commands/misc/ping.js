const { Client, CommandInteraction } = require('discord.js');

module.exports = {
  name: 'ping',
  categories: 'Miscellaneous',
  description: 'Check to make sure the bot is online.',
  /** 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   * @param {String[]} args 
   */
  run: async (client, interaction) => {
    interaction.editReply({ content: `Ping : ${client.ws.ping}` })
  }
}