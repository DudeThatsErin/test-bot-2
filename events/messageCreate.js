const config = require('../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(config.bot.prefix)) return;

        const [cmd, ...args] = message.content.slice(config.bot.prefix.length).trim().split(" ");

        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        if (!command || command) return message.reply('This is a depreciated command. Erin, you need to update this command still!');
    }
}// end client.on message