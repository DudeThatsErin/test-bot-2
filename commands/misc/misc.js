const Discord = require('discord.js');
const config = require('../../config/config.json');
const prefix = config.prefix;
const db = require('../../config/database.json');
const developer = require('../../config/owner.json');
const embed = require('../../config/embed.json');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'erin',
    aliases: ['me', 'dev', 'yaya'],
    ownerOnly: 'yes',
    execute(message) {

        const embed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setTitle('Here are all of the commands you can use, Erin!')
            .setDescription('\`\`\`css\nadd-guilds\nadd-patron\nbot-status\nserver-status\nserver\nremove-guilds\nclear-suggs\ncheck-patrons\nremove-patron\nin-prog\ncompleted\ntest (test command... new stuff)\`\`\`')
            .addFields({
                name: 'This is how your config.json is set up...',
                value: `Database JSON File:\n${db.host}\n${db.user}\nDB PASSWORD\n${db.database}\n\nBot JSON File: ${bot.tag}\n${bot.name}\nowner ID\`${bot.ownerID}\`\n${bot.server}\n${bot.invite_link}\n${bot.avatar}\n${bot.release}\n${bot.patreon}\n${bot.type}\n${bot.url}\nsm's server ID: \`${bot.server_id}\`\ntest server's ID:\`${bot.testserver_id}\`\n\nDev JSON File:\n${developer.name}\n${developer.username}\n${developer.tag}\nmy id: \`${developer.id}\`\n${developer.url}\n\nEmbed JSON File:\nGOOD_COLOR\nBAD_COLOR\nIMPORTANT_MESSAGE_COLOR\nRANDOM_COLOR\nFOOTER_TEXT: ${embed.footertext}\nFOOTER_ICON: ${embed.footericon}`
            })
            .setTimestamp()
            .setFooter(`Run \`/help <command>\` to see what these do and how to use them.`, embed.footericon);

        message.channel.send(embed);
    }
}