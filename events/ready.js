const connection = require('../database.js');
const { MessageEmbed } = require('discord.js');

console.log('|-----------------------------------|')
console.log('          Logging In...             ')
console.log('|-----------------------------------|')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
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

                const channel = client.channels.cache.get('840345709374472192');

                /*let ready = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(`Test is logged in!`)
                    .setDescription(`Erin, Test Bot with **Discord.js V13** is online! My current prefix is \`${result[0][0].prefix}\``)
                    .addFields({
                        name: 'Servers',
                        value: `${client.guilds.cache.size}`
                    }, {
                        name: 'Users',
                        value: `${client.users.cache.size}`
                    }, {
                        name: 'Channels',
                        value: `${client.channels.cache.size} `
                    })
                    .setTimestamp()
                    .setFooter(`This server ID: 718253204147798047`);
                channel.send(ready);*/
            }).catch(err => console.log(err));
        });


    }
}