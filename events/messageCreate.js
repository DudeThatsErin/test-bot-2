const config = require('../config.json');
const connection = require('../database.js');
const Discord = require('discord.js');


module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        client.cooldowns = new Discord.Collection();
        const { cooldowns } = client;
        //get prefix
        const prefix = client.guildCommandPrefixes.get(message.guild.id);
        //console.log('My prefix is...' + prefix)
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

            // thanks system
            const thnks = ['thanks', 'thnx', 'thank', 'tnx', 'ty', 'Thanks', 'Thank', 'thx'];
            const isthanks = thnks.reduce((alrdyGood, curr) => alrdyGood || message.content.toLowerCase().split(' ').includes(curr), false);
            if (isthanks && !message.content.startsWith(prefix)) {
                message.reply(`It seems like someone\'s problem was resolved! I\'m glad someone was able to help you! Please use the \`s.thanks <@username or ID>\` command to show your appreciation!`);
                //console.log('gave thanks');
            }

            if (!message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return message.channel.send('That command does not exist. Run \`s.help\` to see all of my commands.');
            //console.log(command); works

            // owner only
            if (command.ownerOnly === 'yes') {
                if (!message.author.id === config.developer.id) {
                    return message.reply('This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the `s.report` command.');
                }
            }

            // perms
            if (command.botPerms.length > 0) {
                let clientChannelPermissions = message.channel.permissionsFor(client.user);
                clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
                if (!clientChannelPermissions.has(command.botPerms)) {
                    let missingPermissions = command.botPerms.filter(perm => clientChannelPermissions.has(perm) === false).join(', ');
                    let currentPermissions = command.botPerms.filter(perm => clientChannelPermissions.has(perm) === true).join(', ');
                    console.error(`I can\'t execute this command, Sakura Moon is missing permissions these permissions: ${missingPermissions}\nI am missing these permissions in ${message.guild.name} with the ID of ${message.guild.id}.`);
                    const botPermsEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Oh no! An _error_ has appeared!')
                        //.setDescription(`**Contact Bot Owner:** <@${config.developer.id}>`)
                        .addFields({
                            name: '**Error Name:**',
                            value: `\`MISSING PERMISSIONS\``
                        }, {
                            name: '**Error Message:**',
                            value: `Sakura Moon is missing these permissions for this command:\n\`\`\`${missingPermissions}\`\`\``
                        }, {
                            name: '**Message That Triggered Error:**',
                            value: `\`\`\`Message Content: ${message.content}\nBy: ${message.author.tag} - ${message.author.id}\nLocated in the Channel: ${message.channel.name}\nChannel ID: ${message.channel.id}\nMessage ID: ${message.id}\`\`\``
                        }, {
                            name: '**Sakura Moon\'s Current Roles:**',
                            value: `\`\`\`${currentPermissions}\`\`\``
                        }, {
                            name: '**Ways to Fix:**',
                            value: 'In order to resolve this error, you need to go into either your channel or role settings and give Sakura Moon the permissions that she is stating she is missing above. If you aren\'t sure how to do that, you can check [this webpage](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-permissions-). Setting up a user\'s permissions is the same as setting up a bot\'s permissions.'
                        }, {
                            name: '**Ways to Report:**',
                            value: `If you feel like you are still receiving this message in error. Please take screenshots of the permissions you have set for Sakura Moon and use the options below to report the error to the developer.\n[Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                        })
                        .setTimestamp()
                        .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                    client.users.cache.get(message.member.id).send(botPermsEmbed);
                    message.react('❌');
                    message.reply(`Sakura Moon does not have the required permissions. If your DMs are open, I have sent you a DM on the matter. Just in case you don\'t have your DMs open, the permissions Sakura Moon needs are:\n\`\`\`${missingPermissions}\`\`\` and her current permissions are:\n\`\`\`${currentPermissions}\`\`\`If you feel you are receiving this message in error, open your DMs and run the command again to get ways to report this to the developer.`)
                    return;
                }
            }

            if (command.userPerms.length > 0) {
                let memberChannelPermissions = message.channel.permissionsFor(message.member);
                memberChannelPermissions = new Discord.Permissions(memberChannelPermissions.bitfield);
                if (!memberChannelPermissions.has(command.userPerms)) {
                    let missingPermissions = command.userPerms.filter(perm => memberChannelPermissions.has(perm) === false).join(', ');
                    let currentPermissions = command.botPerms.filter(perm => memberChannelPermissions.has(perm) === true).join(', ');
                    console.error(`I can\'t execute this command, ${message.author.tag} with ID of ${message.author.id} is missing permissions these perms: ${missingPermissions}.\nThey currently have these perms: ${currentPermissions}.`);
                    const userPermsEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Oh no! An _error_ has appeared!')
                        //.setDescription(`**Contact Bot Owner:** <@${config.botOwnerID}>`)
                        .addFields({
                            name: '**Error Name:**',
                            value: `\`MISSING PERMISSIONS\``
                        }, {
                            name: '**Error Message:**',
                            value: `${message.author.tag} is missing these permissions for this command:\n\`\`\`${missingPermissions}\`\`\``
                        }, {
                            name: '**Message That Triggered Error:**',
                            value: `\`\`\`Message Content: ${message.content}\nBy: ${message.author.tag} - ${message.author.id}\nLocated in the Channel: ${message.channel.name}\nChannel ID: ${message.channel.id}\nMessage ID: ${message.id}\`\`\``
                        }, {
                            name: `**${message.author.username}\'s Current Roles:**`,
                            value: `\`\`\`${currentPermissions}\`\`\``
                        }, {
                            name: '**Ways to Fix:**',
                            value: 'In order to resolve this error, a moderator needs to go into either this channel or their server\'s role settings and give you the permissions that she is stating you are missing above. If they aren\'t sure how to do that, you can give them [this link](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-permissions-).'
                        }, {
                            name: '**Ways to Report:**',
                            value: `If you or the mods feel like you are still receiving this message in error. Please take screenshots of the permissions that are set for **${message.author.tag}** and use the options below to report the error to the developer.\n[Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                        })
                        .setTimestamp()
                        .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                    client.users.cache.get(message.member.id).send(userPermsEmbed);
                    message.react('❌');
                    message.reply(`You do not have the required permissions. If your DMs are open, I have sent you a DM on the matter. Just in case you don\'t have your DMs open, the permissions you need are:\n\`\`\`${missingPermissions}\`\`\` and your current permissions are:\n\`\`\`${currentPermissions}\`\`\`If you feel you are receiving this message in error, open your DMs and run the command again to get ways to report this to the developer.`)
                    return;
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
                    return message.reply(`Only patrons have access to \`${prefix}${command}\`. If you would like to become a patron, check here on Patreon: https://www.patreon.com/SakuraMoon`)
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
                        name: '**Message That Triggered Error:**',
                        value: `\`\`\`Message Content: ${message.content}\nBy: ${message.author.tag} - ${message.author.id}\nLocated in the Channel: ${message.channel.name}\nChannel ID: ${message.channel.id}\nMessage ID: ${message.id}\`\`\``
                    }, {
                        name: '**Ways to Report:**',
                        value: '[Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!'
                    })
                    .setTimestamp()
                    .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                message.channel.send(embed);
            }
            /* ---------------------------------------------
            REGULAR COMMANDS / THANKS SYSTEM OFF
            ------------------------------------------------
            */
        } else {
            if (!message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return message.channel.send('That command does not exist. Run \`s.help\` to see all of my commands.');
            //console.log(command);

            // owner only
            if (command.ownerOnly === 'yes') {
                if (!message.author.id === config.developer.id) {
                    return message.reply('This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the `s.report` command.');
                }
            }

            // perms
            if (command.botPerms.length > 0) {
                let clientChannelPermissions = message.channel.permissionsFor(client.user);
                clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
                if (!clientChannelPermissions.has(command.botPerms)) {
                    let missingPermissions = command.botPerms.filter(perm => clientChannelPermissions.has(perm) === false).join(', ');
                    let currentPermissions = command.botPerms.filter(perm => clientChannelPermissions.has(perm) === true).join(', ');
                    console.error(`I can\'t execute this command, Sakura Moon is missing permissions these permissions: ${missingPermissions}\nI am missing these permissions in ${message.guild.name} with the ID of ${message.guild.id}.`);
                    const botPermsEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Oh no! An _error_ has appeared!')
                        //.setDescription(`**Contact Bot Owner:** <@${config.developer.id}>`)
                        .addFields({
                            name: '**Error Name:**',
                            value: `\`MISSING PERMISSIONS\``
                        }, {
                            name: '**Error Message:**',
                            value: `Sakura Moon is missing these permissions for this command:\n\`\`\`${missingPermissions}\`\`\``
                        }, {
                            name: '**Message That Triggered Error:**',
                            value: `\`\`\`Message Content: ${message.content}\nBy: ${message.author.tag} - ${message.author.id}\nLocated in the Channel: ${message.channel.name}\nChannel ID: ${message.channel.id}\nMessage ID: ${message.id}\`\`\``
                        }, {
                            name: '**Sakura Moon\'s Current Roles:**',
                            value: `\`\`\`${currentPermissions}\`\`\``
                        },{
                            name: '**Ways to Fix:**',
                            value: 'In order to resolve this error, you need to go into either your channel or role settings and give Sakura Moon the permissions that she is stating she is missing above. If you aren\'t sure how to do that, you can check [this webpage](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-permissions-). Setting up a user\'s permissions is the same as setting up a bot\'s permissions.'
                        }, {
                            name: '**Ways to Report:**',
                            value: `If you feel like you are still receiving this message in error. Please take screenshots of the permissions you have set for Sakura Moon and use the options below to report the error to the developer.\n[Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                        })
                        .setTimestamp()
                        .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                    client.users.cache.get(message.member.id).send(botPermsEmbed);
                    message.react('❌');
                    message.reply(`Sakura Moon does not have the required permissions. If your DMs are open, I have sent you a DM on the matter. Just in case you don\'t have your DMs open, the permissions Sakura Moon needs are:\n\`\`\`${missingPermissions}\`\`\` and her current permissions are:\n\`\`\`${currentPermissions}\`\`\`If you feel you are receiving this message in error, open your DMs and run the command again to get ways to report this to the developer.`)
                    return;
                }
            }

            if (command.userPerms.length > 0) {
                let memberChannelPermissions = message.channel.permissionsFor(message.member);
                memberChannelPermissions = new Discord.Permissions(memberChannelPermissions.bitfield);
                if (!memberChannelPermissions.has(command.userPerms)) {
                    let missingPermissions = command.userPerms.filter(perm => memberChannelPermissions.has(perm) === false).join(', ');
                    let currentPermissions = command.botPerms.filter(perm => memberChannelPermissions.has(perm) === true).join(', ');
                    console.error(`I can\'t execute this command, ${message.author.tag} with ID of ${message.author.id} is missing permissions these perms: ${missingPermissions}.\nThey currently have these perms: ${currentPermissions}.`);
                    const userPermsEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Oh no! An _error_ has appeared!')
                        //.setDescription(`**Contact Bot Owner:** <@${config.botOwnerID}>`)
                        .addFields({
                            name: '**Error Name:**',
                            value: `\`MISSING PERMISSIONS\``
                        }, {
                            name: '**Error Message:**',
                            value: `${message.author.tag} is missing these permissions for this command:\n\`\`\`${missingPermissions}\`\`\``
                        }, {
                            name: '**Message That Triggered Error:**',
                            value: `\`\`\`Message Content: ${message.content}\nBy: ${message.author.tag} - ${message.author.id}\nLocated in the Channel: ${message.channel.name}\nChannel ID: ${message.channel.id}\nMessage ID: ${message.id}\`\`\``
                        }, {
                            name: `**${message.author.username}\'s Current Roles:**`,
                            value: `\`\`\`${currentPermissions}\`\`\``
                        }, {
                            name: '**Ways to Fix:**',
                            value: 'In order to resolve this error, a moderator needs to go into either this channel or their server\'s role settings and give you the permissions that she is stating you are missing above. If they aren\'t sure how to do that, you can give them [this link](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-permissions-).'
                        }, {
                            name: '**Ways to Report:**',
                            value: `If you or the mods feel like you are still receiving this message in error. Please take screenshots of the permissions that are set for **${message.author.tag}** and use the options below to report the error to the developer.\n[Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                        })
                        .setTimestamp()
                        .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                    client.users.cache.get(message.member.id).send(userPermsEmbed);
                    message.react('❌');
                    message.reply(`You do not have the required permissions. If your DMs are open, I have sent you a DM on the matter. Just in case you don\'t have your DMs open, the permissions you need are:\n\`\`\`${missingPermissions}\`\`\` and your current permissions are:\n\`\`\`${currentPermissions}\`\`\`If you feel you are receiving this message in error, open your DMs and run the command again to get ways to report this to the developer.`)
                    return;
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
                    return message.reply(`Only patrons have access to \`${prefix}${command}\`. If you would like to become a patron, check here on Patreon: https://www.patreon.com/SakuraMoon`)
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
                        value: 'Run the \`r.report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!'
                    })
                    .setTimestamp()
                    .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
                message.channel.send(embed);
            }
        }
    }
}// end client.on message