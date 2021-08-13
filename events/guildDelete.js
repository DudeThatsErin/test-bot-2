const connection = require('../database.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildDelete',
    once: true,
    async execute(client) {

        const guildResults = await connection.query(
            `SELECT * FROM Guilds WHERE guildId = ?;`,
            [guild.id]
        )
        let guildName = guild.name;
        let guildId = guild.id;
        let ownerID = guild.ownerID;
        let ownerName = client.users.cache.get(ownerID).username;
        let discrim = ownerID.discriminator;
        let region = guild.region;
        let auditLog = guildResults[0][0].auditLog;
        let currentPrefix = guildResults[0][0].prefix;
        let thanks = guildResults[0][0].thanks;
        const channel = client.channels.cache.find(channel => channel.id === '852192258156920853');

        let newGuild = new MessageEmbed()
            .setColor('#BB41CE')
            .setTitle('I got removed from a guild! ☹️')
            .setDescription(`I was just from a a new guild named: ${guildName}`)
            .addFields({
                name: 'Guild ID:',
                value: `${guildId}`
            }, {
                name: 'Owner ID:',
                value: `${ownerID}`
            }, {
                name: 'Owner Name:',
                value: `${ownerName}#${discrim}`
            }, {
                name: 'Guild Name:',
                value: `${guildName}`
            }, {
                name: 'Guild Region:',
                value: `${region}`
            }, {
                name: 'Audit Log:',
                value: `${auditLog}`
            }, {
                name: 'Prefix:',
                value: `${currentPrefix}`
            }, {
                name: 'Thanks System',
                value: `${thanks}`
            })
            .setTimestamp()
            .setFooter('I have removed this information from the Guilds Database.', 'https://codinghelp.site/bots/sm/neon-moon.jpg')
        channel.send(newGuild)
        try {
            await connection.query(
                `DELETE FROM Guilds WHERE guildId = ?;`,
                [guildId]
            );
        } catch (err) {
            console.log(err);
        }
    }
}