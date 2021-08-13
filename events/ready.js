const connection = require('../database.js');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('|-----------------------------------|')
        console.log('          Logging In...             ')
        console.log('|-----------------------------------|')
        console.log(`   ${client.user.tag} is\n   logged in and ready!`);
        console.log('|-----------------------------------|')
        console.log('          Error Logs...             ')
        console.log('|-----------------------------------|')

        client.user.setPresence({ activities: [{ name: 'with discord.js' }] });

        //prefixes
        client.guilds.cache.forEach(guild => {
            connection.query(
                `SELECT prefix FROM Guilds WHERE guildId = ?;`,
                [guild.id]
            ).then(result => {
                client.guildCommandPrefixes.set(guild.id, result[0][0].prefix);

                const time = new Date();
                const startTime = `${time.getHours()}:${time.getMinutes()}, ${time.getDate()}/${time.getMonth()}/${time.getFullYear()} UTC`;
                const channel = client.channels.cache.get('840345709374472192')
                const prf = config.bot.prefix;

                let ready = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`${config.bot.tag} is logged in!`)
                    .setDescription(`${config.developer.name}, ${config.bot.name} running DJSV13 testing for \`Sakura Moon\` is online! My current prefix is ${prf}`)
                    .addFields({
                        name: 'Time',
                        value: startTime
                    }, {
                        name: 'Servers',
                        value: `${client.guilds.cache.size} `
                    }, {
                        name: 'Users',
                        value: `${client.users.cache.size}`
                    }, {
                        name: 'Channels',
                        value: `${client.channels.cache.size} `
                    })
                    .setThumbnail(`${config.bot.avatar}`)
                    .setTimestamp()
                    .setFooter(`This server ID: ${config.bot.server_id}`, `${config.bot.avatar}`);
                channel.send({ embeds: [ready] });
            }).catch(err => console.log(err));
        });


    }
}