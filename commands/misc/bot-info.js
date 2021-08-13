const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bot-info',
    aliases: ['ch-info', 'botinfo', 'bi', 'chi', 'codinghelp-info', 'robotinfo', 'robot-info', 'ri'],
    modOnly: 'no',
    description: 'This gives you all the information you could need about the r/CodingHelp bot.',
    userPerms: [''],
    botPerms: [''],
    execute(message, args, client) {


        const embed = new MessageEmbed()
            .setColor('#2980B9')
            .setTitle(`About ${config.bot.tag}...`)
            .setURL(config.bot.website)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(`https://codinghelp.site/bots/codinghelp.png`)
            .addFields(
                { name: 'Date Created:', value: `01 August 2020` },
                { name: 'Bot Name & ID:', value: `${config.bot.tag} \`${config.bot.id}\`` },
                { name: 'Bot Website:', value: config.bot.website },
                { name: 'Repository:', value: config.bot.github },
                { name: 'Developer\'s name & ID:', value: `${config.bot.devName} \`${config.bot.devId}\`` },
                { name: 'Prefix:', value: config.bot.prefix },
                { name: 'Current Nickname:', value: message.guild.members.cache.get(config.bot.id).displayName },
                { name: 'Current Status:', value: client.user.presence.status }
            )
            .setTimestamp()
            .setFooter('Thanks for your interest!', config.bot.avatar);
        message.channel.send(embed);
    }
}