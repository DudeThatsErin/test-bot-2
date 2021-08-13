const config = require('../config.json');
const connection = require('../database.js');
const Discord = require('discord.js');
const thanksEvent = require('thanksEvent.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        client.cooldowns = new Discord.Collection();
        const { cooldowns } = client;
        if (message.author.bot) return;
        /* -----------------------------------------
        THANKS
        --------------------------------------------
        */
        const results3 = await connection.query(
            `SELECT thanks FROM Guilds WHERE guildId = ?;`,
            [message.guild.id]
        );
        const th = results3[0][0].thanks;
        if (th === 'on' || th === '1') { // if thanks is on

            //get prefix
            const prefix = client.guildCommandPrefixes.get(message.guild.id);
            // thanks system
            const thnks = ['thanks', 'thnx', 'thank', 'tnx', 'ty', 'Thanks', 'Thank', 'thx'];
            const isthanks = thnks.reduce((alrdyGood, curr) => alrdyGood || message.content.toLowerCase().split(' ').includes(curr), false);
            if (isthanks && !message.content.startsWith(prefix)) {
                message.reply(`It seems like someone\'s problem was resolved! I\'m glad someone was able to help you! Please use the \`${prefix}thanks <@username or ID>\` command to show your appreciation!`);
            }

            if (!message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return message.channel.send(`That command does not exist. Run \`${prefix}help\` to see all of my commands.`);
            //console.log(command); works

            // owner only
            if (command.ownerOnly === 'yes') {
                if (!message.author.id === config.developer.id) {
                    return message.reply(`This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the \`${prefix}report\` command.`);
                }
            }

            // patreon only
            const results = await connection.query(
                `SELECT * from Patrons;`,
                [message.guild.id]
            );
            const guilds = results[0][0].guildId;

            if (command.patreonOnly === 'yes') {
                if (!message.guild.id === guilds) {
                    return message.reply(`Only patrons have access to \`${prefix}${command.name}\`. If you would like to become a patron, check here on Patreon: https://www.patreon.com/SakuraMoon`)
                }
            }

            // command cooldowns
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 1) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            // actually running the commands.
            try {
                command.execute(message, args, client);
            } catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Oh no! An _error_ has appeared!')
                    .setDescription(`**Contact Bot Owner:** <@${config.botOwnerID}>`)
                    .addFields({
                        name: '**Error Name:**',
                        value: `\`${error.name}\``
                    }, {
                        name: '**Error Message:**',
                        value: `\`${error.message}\``
                    }, {
                        name: '**Error Location:**',
                        value: `\`${error.stack}\``
                    }, {
                        name: '**Ways to Report:**',
                        value: `Run the \`${prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                    })
                    .setTimestamp()
                    .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
                message.channel.send({ embeds: [embed] });
            }

        /* ---------------------------------------------
        REGULAR COMMANDS / THANKS SYSTEM OFF
        ------------------------------------------------
        */
        } else {
            //get prefix
            const prefix = client.guildCommandPrefixes.get(message.guild.id);
            if (!message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return message.channel.send(`That command does not exist. Run \`${prefix}help\` to see all of my commands.`);
            //console.log(command); works

            // owner only
            if (command.ownerOnly === 'yes') {
                if (!message.author.id === config.developer.id) {
                    return message.reply(`This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the \`${prefix}report\` command.`);
                }
            }

            // patreon only
            const results = await connection.query(
                `SELECT * from Patrons;`,
                [message.guild.id]
            );
            const guilds = results[0][0].guildId;

            if (command.patreonOnly === 'yes') {
                if (!message.guild.id === guilds) {
                    return message.reply(`Only patrons have access to \`${prefix}${command.name}\`. If you would like to become a patron, check here on Patreon: https://www.patreon.com/SakuraMoon`)
                }
            }

            // command cooldowns
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 1) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            // actually running the commands.
            try {
                command.execute(message, args, client);
            } catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Oh no! An _error_ has appeared!')
                    .setDescription(`**Contact Bot Owner:** <@${config.botOwnerID}>`)
                    .addFields({
                        name: '**Error Name:**',
                        value: `\`${error.name}\``
                    }, {
                        name: '**Error Message:**',
                        value: `\`${error.message}\``
                    }, {
                        name: '**Error Location:**',
                        value: `\`${error.stack}\``
                    }, {
                        name: '**Ways to Report:**',
                        value: `Run the \`${prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                    })
                    .setTimestamp()
                    .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
                message.channel.send(embed);
            }
        }
    }
}// end client.on message