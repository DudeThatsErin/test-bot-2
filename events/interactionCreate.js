const config = require('../config.json');
const connection = require('../database.js');
const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return interaction.followUp({ content: 'That is not a valid slash command.' });
        if (!client.commands.has(interaction.commandName)) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp({ content: 'This command no longer exists.' }) && client.commands.delete(interaction.commandName);

        /* -----------------------------------------
            THANKS
        --------------------------------------------
        */
        const results3 = await connection.query(
            `SELECT thanks FROM Guilds WHERE guildId = ?;`,
            [interaction.guild.id]
        );
        const th = results3[0][0].thanks;
        if (th === 'on' || th === '1') { // if thanks is on
            const thnks = ['thanks', 'thnx', 'thank', 'tnx', 'ty', 'Thanks', 'Thank', 'thx'];
            const isthanks = thnks.reduce((alrdyGood, curr) => alrdyGood || interaction.content.toLowerCase().split(' ').includes(curr), false);
            if (isthanks && !interaction.content.startsWith(config.bot.prefix)) {
                interaction.reply(`It seems like someone\'s problem was resolved! I\'m glad someone was able to help you! Please use the \`${config.bot.prefix}thanks <@username or ID>\` command to show your appreciation!`);
            }

            // owner only
            if (command.ownerOnly === 'yes') {
                if (!interaction.user.id === config.developer.id) {
                    return interaction.reply(`This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the \`${prefix}report\` command.`);
                }
            }

            // patreon only
            const results = await connection.query(
                `SELECT * from Patrons;`,
                [interaction.guild.id]
            );
            const guilds = results[0][0].guildId;

            if (command.patreonOnly === 'yes') {
                if (!interaction.guild.id === guilds) {
                    return interaction.reply(`Only patrons have access to \`${prefix}${command.name}\`. If you would like to become a patron, check here on Patreon: https://www.patreon.com/SakuraMoon`)
                }
            }

            // command cooldowns
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 1) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return interaction.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            // perm handler


            // actually running the commands.
            try {
                await client.commands.execute(interaction, client);
            } catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Oh no! An _error_ has appeared!')
                    .setDescription(`**Contact Bot Owner:** <@${config.bot.ownerID}>`)
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
                        value: `Run the \`${config.bot.prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                    })
                    .setTimestamp()
                    .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
                interaction.reply({ embeds: [embed] });
            }
        } // thanks system off
        else {
            // owner only
            if (command.ownerOnly === 'yes') {
                if (!interaction.user.id === config.developer.id) {
                    return interaction.reply(`This is only a command Erin (DudeThatsErin#8061) can use. If you are seeing this in error use the \`${prefix}report\` command.`);
                }
            }

            // patreon only
            const results = await connection.query(
                `SELECT * from Patrons;`,
                [interaction.guild.id]
            );
            const guilds = results[0][0].guildId;

            if (command.patreonOnly === 'yes') {
                if (!interaction.guild.id === guilds) {
                    return interaction.reply(`Only patrons have access to \`${prefix}${command.name}\`. If you would like to become a patron, check here on Patreon: https://www.patreon.com/SakuraMoon`)
                }
            }

            // command cooldowns
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 1) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return interaction.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            const modRoles = ['780941276602302523', '822500305353703434', '718253309101867008', '751526654781685912'];
            const modIDs = ['732667572448657539', '455926927371534346', '541305895544422430'];
            const isMod = modIDs.reduce((alrdyGod, crr) => alrdyGod || interaction.content.toLowerCase().split(' ').includes(crr), false);
            let value = 0;
            if (interaction.channel.parentID === '382210817636040706') {
                for (const ID of modRoles) {
                    if (!interaction.member.roles.cache.has(ID)) {
                        value++
                    }
                    //message.channel.parentID === '382210817636040706' &&
                    if (value != modRoles.length && isMod) {
                        interaction.react('❌');
                        interaction.reply(`Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!`);
                    }
                }
            }

            if (command.modOnly === 'yes') {
                for (const ID of modRoles) {
                    if (!interaction.member.roles.cache.has(ID)) {
                        value++
                    }

                    if (value == modRoles.length) {
                        interaction.react('❌');
                        interaction.reply(`This is a command only moderators can use. You do not have the required permissions. Moderators have the <@&${modRoles[0]}> role or <@&${modRoles[1]}> role or <@&${modRoles[2]}> role  or <@&${modRoles[3]}> role. Please run \`${config.bot.prefix}report [issue]\` if you are seeing this in error.`);
                        return;
                    }
                }
            }

            const chllMod = ['839863262026924083', '718253309101867008'];
            if (command.challengeMods === 'yes') {
                for (const ID of chllMod) {
                    if (!interaction.member.roles.cache.has(ID)) {
                        value++
                    }
                    if (value == chllMod.length) {
                        interaction.react('❌');
                        interaction.reply(`This is a command only challenge moderators can use. You do not have the required permissions. Challenge moderators have the <@&${chllMod[1]}> role. Please run \`${config.bot.prefix}report [issue]\` if you are seeing this in error.`);
                        return;
                    }
                }
            }

            // perms
            if (command.botPerms.length > 0) {
                let clientChannelPermissions = interaction.channel.permissionsFor(client.user);
                clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
                if (!clientChannelPermissions.has(command.botPerms)) {
                    let missingPermissions = command.botPerms.filter(perm => clientChannelPermissions.has(perm) === false).join(', ');
                    let currentPermissions = command.botPerms.filter(perm => clientChannelPermissions.has(perm) === true).join(', ');
                    console.error(`I can\'t execute this command, ${config.bot.name} is missing permissions these permissions: ${missingPermissions}\nI am missing these permissions in ${interaction.guild.name} with the ID of ${interaction.guild.id}.`);
                    const botPermsEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Oh no! An _error_ has appeared!')
                        .setDescription(`**Contact Bot Owner:** <@${config.bot.ownerID}>`)
                        .addFields({
                            name: '**Error Name:**',
                            value: `\`MISSING PERMISSIONS\``
                        }, {
                            name: '**Error Message:**',
                            value: `${config.bot.name} is missing these permissions for this command:\n\`\`\`${missingPermissions}\`\`\``
                        }, {
                            name: '**Message That Triggered Error:**',
                            value: `\`\`\`Message Content: ${message.content}\nBy: ${interaction.user.tag} - ${interaction.user.id}\nLocated in the Channel: ${interaction.channel.name}\nChannel ID: ${interaction.channel.id}\nMessage ID: ${interaction.id}\`\`\``
                        }, {
                            name: `**${config.bot.name}\'s Current Roles:**`,
                            value: `\`\`\`${currentPermissions}\`\`\``
                        }, {
                            name: '**Ways to Fix:**',
                            value: `In order to resolve this error, you need to go into either your channel or role settings and give ${config.bot.name} the permissions that she is stating she is missing above. If you aren\'t sure how to do that, you can check [this webpage](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-permissions-). Setting up a user\'s permissions is the same as setting up a bot\'s permissions.`
                        }, {
                            name: '**Ways to Report:**',
                            value: `If you feel like you are still receiving this interaction in error. Please take screenshots of the permissions you have set for ${config.bot.name} and use the options below to report the error to the developer.\nRun the \`${config.bot.prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                        })
                        .setTimestamp()
                        .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                    client.users.cache.get(interaction.member.id).send(botPermsEmbed);
                    interaction.react('❌');
                    interaction.reply(`${config.bot.name} does not have the required permissions. If your DMs are open, I have sent you a DM on the matter. Just in case you don\'t have your DMs open, the permissions ${config.bot.name} needs are:\n\`\`\`${missingPermissions}\`\`\` and her current permissions are:\n\`\`\`${currentPermissions}\`\`\`If you feel you are receiving this message in error, open your DMs and run the command again to get ways to report this to the developer.`)
                    return;
                }
            }

            if (command.userPerms.length > 0) {
                let memberChannelPermissions = interaction.channel.permissionsFor(interaction.member);
                memberChannelPermissions = new Discord.Permissions(memberChannelPermissions.bitfield);
                if (!memberChannelPermissions.has(command.userPerms)) {
                    let missingPermissions = command.userPerms.filter(perm => memberChannelPermissions.has(perm) === false).join(', ');
                    let currentPermissions = command.botPerms.filter(perm => memberChannelPermissions.has(perm) === true).join(', ');
                    console.error(`I can\'t execute this command, ${interaction.user.tag} with ID of ${interaction.user.id} is missing permissions these perms: ${missingPermissions}.\nThey currently have these perms: ${currentPermissions}. ${config.bot.name} threw this error.`);
                    const userPermsEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Oh no! An _error_ has appeared!')
                        .setDescription(`**Contact Bot Owner:** <@${config.bot.ownerID}>`)
                        .addFields({
                            name: '**Error Name:**',
                            value: `\`MISSING PERMISSIONS\``
                        }, {
                            name: '**Error Message:**',
                            value: `${interaction.user.tag} is missing these permissions for this command:\n\`\`\`${missingPermissions}\`\`\``
                        }, {
                            name: '**Message That Triggered Error:**',
                            value: `\`\`\`Message Content: ${message.content}\nBy: ${message.author.tag} - ${interaction.user.id}\nLocated in the Channel: ${interaction.channel.name}\nChannel ID: ${interaction.channel.id}\nMessage ID: ${interaction.id}\`\`\``
                        }, {
                            name: `**${interaction.user.username}\'s Current Roles:**`,
                            value: `\`\`\`${currentPermissions}\`\`\``
                        }, {
                            name: '**Ways to Fix:**',
                            value: 'In order to resolve this error, a moderator needs to go into either this channel or their server\'s role settings and give you the permissions that she is stating you are missing above. If they aren\'t sure how to do that, you can give them [this link](https://support.discord.com/hc/en-us/articles/206029707-How-do-I-set-up-permissions-).'
                        }, {
                            name: '**Ways to Report:**',
                            value: `If you or the mods feel like you are still receiving this message in error. Please take screenshots of the permissions that are set for **${interaction.user.tag}** and use the options below to report the error to the developer.\nRun the \`${config.bot.prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                        })
                        .setTimestamp()
                        .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`);
                    client.users.cache.get(interaction.member.id).send(userPermsEmbed);
                    interaction.react('❌');
                    interaction.reply(`You do not have the required permissions. If your DMs are open, I have sent you a DM on the matter. Just in case you don\'t have your DMs open, the permissions you need are:\n\`\`\`${missingPermissions}\`\`\` and your current permissions are:\n\`\`\`${currentPermissions}\`\`\`If you feel you are receiving this message in error, open your DMs and run the command again to get ways to report this to the developer.`)
                    return;
                }
            }


            // actually running the commands.
            try {
                await client.commands.execute(interaction, client);
            } catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Oh no! An _error_ has appeared!')
                    .setDescription(`**Contact Bot Owner:** <@${config.bot.ownerID}>`)
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
                        value: `Run the \`${config.bot.prefix}report\` command, [Join My Support Server](https://discord.gg/tT3VEW8AYF), [Fill out this form](https://codinghelp.site/contact-us/) (Erin owns CodingHelp so that form goes directly to her), Message her on Discord, or Email her at me@dudethatserin.site\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                    })
                    .setTimestamp()
                    .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
                interaction.reply({ embeds: [embed] });
            }
        }
    }
};